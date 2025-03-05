"use client";

import { postEntry } from "@/app/lib/action/entry";
import DateField from "@/app/ui/FormFields/DateField";
import NumberField from "@/app/ui/FormFields/NumberField";
import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
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

function getCurrentDateFormated() {
  let yourDate = new Date();
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
  return yourDate.toISOString().split("T")[0];
}

export default function EntryForm({ carId }: { carId: string }) {
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: getCurrentDateFormated(),
      description: "",
      odometer: 0,
      place: "",
      tags: "",
      amount: 0,
    },
  });

  const submitForm = async (values: SchemaProps) => {
    await postEntry(values, carId);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <div className="grid gap-6">
          <DateField form={form} name="date" label="Date" />
          <TextField form={form} name="description" label="Description" />
          <NumberField form={form} name="odometer" label="Odometer" />
          <TextField form={form} name="place" label="Place" />
          <TextField form={form} name="tags" label="Tags" />
          <NumberField form={form} name="amount" label="Amount" />
        </div>

        <Button type="submit" className="mt-4">
          Register
        </Button>
      </form>
    </Form>
  );
}
