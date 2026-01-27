"use client";

import { postCar } from "@/app/lib/action/car";
import { Car } from "@/app/lib/definitions";
import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(4, {
      error: "Car name must have at least 4 letters"
}),
  model: z.string(),
  year: z.coerce.number(),
  brand: z.string(),
  color: z.string(),
  plate: z.string(),
  renavam: z.string(),
  aquired_year: z.coerce.number(),
});

type SchemaProps = z.infer<typeof formSchema>;
type Props = {
  userId: string;
  className: string;
};

export default function AddForm({ userId, className = "" }: Props) {
  const router = useRouter();
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      model: "",
      year: new Date().getFullYear(),
      brand: "",
      color: "",
      plate: "",
      renavam: "",
      aquired_year: new Date().getFullYear(),
    },
  });

  const submitForm = async (values: SchemaProps) => {
    const car: Car = {
      id: "",
      user_id: userId,
      name: values.name,
      model: values.model,
      year: values.year,
      brand: values.brand,
      color: values.color,
      plate: values.plate,
      renavam: values.renavam,
      aquired_year: values.aquired_year,
    };
    await postCar(userId, car);
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className={`flex flex-col justify-center items-center ${className}`}
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <div className="flex flex-col gap-6 w-full">
            <TextField name="name" label="Name" />
            <TextField name="model" label="Model" />
            <TextField name="year" label="Year" />
            <TextField name="brand" label="Brand" />
          </div>

          <div className="flex flex-col gap-6 w-full">
            <TextField name="color" label="Color" />
            <TextField name="plate" label="Plate" />
            <TextField name="renavam" label="Renavam" />
            <TextField name="aquired_year" label="Aquired in year" />
          </div>
        </div>

        <div className="flex w-full justify-center gap-4 mt-6">
          <Button type="button" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
}
