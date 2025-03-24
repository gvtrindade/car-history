"use client";

import { putEntry } from "@/app/lib/action/entry";
import { Entry } from "@/app/lib/definitions";
import { getStringfiedDate } from "@/app/lib/util";
import DateField from "@/app/ui/FormFields/DateField";
import NumberField from "@/app/ui/FormFields/NumberField";
import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Modal from "../Modal";

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

type Props = { entry: Entry; setIsEditing: (state: boolean) => void };

export default function FormRow({ entry, setIsEditing }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: getStringfiedDate(entry.date),
      description: entry.description,
      odometer: entry.odometer,
      place: entry.place ?? "",
      tags: entry.tags ?? "",
      amount: entry.amount,
    },
  });

  const [open, setOpen] = useState(false);

  const submitForm = async () => {
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
      tags: values.tags!,
    };

    try {
      if (session?.user && session.user.id) {
        await putEntry(session.user.id, editEntry);
        setOpen(false);
        setIsEditing(false);
        router.refresh();
      } else {
        throw Error("Invalid user")
      }
    } catch (e) {
      //Show toast
      console.log(e);
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
              <DateField name="date" label="Date" />
              <TextField name="description" label="Description" />
            </div>

            <div className="flex flex-col gap-6 w-full max-w-xs">
              <NumberField name="odometer" label="Odometer" />
              <TextField name="place" label="Place" />
            </div>

            <div className="flex flex-col gap-6 w-full max-w-xs">
              <TextField name="tags" label="Tags" />
              <NumberField name="amount" label="Amount" />
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
