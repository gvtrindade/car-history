"use client";

import { postEntry } from "@/app/lib/action/entry";
import { Entry } from "@/app/lib/definitions";
import { getStringfiedDate } from "@/app/lib/util";
import DateField from "@/app/ui/FormFields/DateField";
import NumberField from "@/app/ui/FormFields/NumberField";
import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
type Props = { carId: string; entry?: Entry };

export default function EntryForm({ carId, entry }: Props) {
  const router = useRouter();
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: getStringfiedDate(),
      description: "",
      odometer: 0,
      place: "",
      tags: "",
      amount: 0,
    },
  });

  async function submitForm(values: SchemaProps) {
    try {
      await postEntry(values, carId);
      router.refresh();
      form.reset();
    } catch (e) {
      // Show toast
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="flex flex-col justify-center"
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <div className="flex flex-col gap-6 w-full max-w-xs">
            <DateField name="date" label="Date" />
            <TextField name="description" label="Description" />
            <NumberField name="odometer" label="Odometer" />
          </div>

          <div className="flex flex-col gap-6 w-full max-w-xs">
            <TextField name="place" label="Place" />
            <TextField name="tags" label="Tags" />
            <NumberField name="amount" label="Amount" />
          </div>
        </div>

        <Button type="submit" className="my-8">
          Register
        </Button>
      </form>
    </Form>
  );
}
