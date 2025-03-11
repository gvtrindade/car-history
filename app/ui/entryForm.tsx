"use client";

import { postEntry } from "@/app/lib/action/entry";
import DateField from "@/app/ui/FormFields/DateField";
import NumberField from "@/app/ui/FormFields/NumberField";
import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Entry } from "../lib/definitions";

const formSchema = z.object({
  date: z.string(),
  description: z
    .string()
    .min(3, { message: "The description should have at least 3 characters" }),
  odometer: z.coerce.number(),
  place: z.string().optional(),
  tags: z.string().optional(),
  amount: z.coerce.number(),
});

type SchemaProps = z.infer<typeof formSchema>;

function getStringfiedDate(date?: Date) {
  let yourDate = date ?? new Date();
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
  return yourDate.toISOString().split("T")[0];
}

type Props = { carId: string; entry?: Entry };

export default function EntryForm({ carId, entry }: Props) {
  const router = useRouter();
  let defaultValues = {
    date: getStringfiedDate(),
    description: "",
    odometer: 0,
    place: "",
    tags: "",
    amount: 0,
  };

  if (entry) {
    defaultValues = {
      date: getStringfiedDate(entry.date),
      description: entry.description,
      odometer: entry.odometer,
      place: entry.place ?? "",
      tags: entry.tags ?? "",
      amount: entry.amount,
    };
  }

  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const submitForm = async (values: SchemaProps) => {
    try {
      await postEntry(values, carId);
      router.refresh();
      form.reset();
    } catch (e) {
      // Show toast
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="flex flex-col justify-center"
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <div className="flex flex-col gap-6 w-full max-w-xs">
            <DateField form={form} name="date" label="Date" />
            <TextField form={form} name="description" label="Description" />
            <NumberField form={form} name="odometer" label="Odometer" />
          </div>

          <div className="flex flex-col gap-6 w-full max-w-xs">
            <TextField form={form} name="place" label="Place" />
            <TextField form={form} name="tags" label="Tags" />
            <NumberField form={form} name="amount" label="Amount" />
          </div>
        </div>

        <Button type="submit" className="my-8">
          Register
        </Button>
      </form>
    </Form>
  );
}
