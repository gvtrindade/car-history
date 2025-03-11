"use client";

import { postEntry, putEntry } from "@/app/lib/action/entry";
import { Entry } from "@/app/lib/definitions";
import DateField from "@/app/ui/FormFields/DateField";
import NumberField from "@/app/ui/FormFields/NumberField";
import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Modal from "../Modal";
import { useState } from "react";

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

type Props = { entry: Entry; setIsEditing: (state: boolean) => void };

export default function FormRow({ entry, setIsEditing }: Props) {
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

  const [open, setOpen] = useState(false);

  const submitForm = async (values: SchemaProps) => {
    setOpen(true);
  };

  const confirmSave = async () => {
    const values = form.getValues();
    const editEntry: Entry = {
      id: entry.id,
      car_id: entry.car_id,
      date: new Date(values.date),
      amount: values.amount,
      description: values.description,
      odometer: values.odometer,
      place: values.place!,
      tags: values.tags!
    };

    try {
      await putEntry(editEntry);
      setOpen(false);
      setIsEditing(false);
      router.refresh();
    } catch (e) {
      //Show toast
    }
  };

  return (
    <div className="inset-shadow-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col justify-center mt-2"
        >
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex flex-col gap-6 w-full max-w-xs">
              <DateField form={form} name="date" label="Date" />
              <TextField form={form} name="description" label="Description" />
            </div>

            <div className="flex flex-col gap-6 w-full max-w-xs">
              <NumberField form={form} name="odometer" label="Odometer" />
              <TextField form={form} name="place" label="Place" />
            </div>

            <div className="flex flex-col gap-6 w-full max-w-xs">
              <TextField form={form} name="tags" label="Tags" />
              <NumberField form={form} name="amount" label="Amount" />
            </div>
          </div>

          <Button type="submit" className="my-8">
            Save
          </Button>
        </form>
      </Form>

      <Modal
        title="Save"
        content="Are you sure you want to save?"
        footer={<Button onClick={confirmSave}>Confirm</Button>}
        open={open}
        setOpen={setOpen}
        includeCancel
      />
    </div>
  );
}
