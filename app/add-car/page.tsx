"use client";

import { createCar } from "@/app/lib/action/car";
import { Car } from "@/app/lib/definitions";
import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(4, { message: "Car name must have at least 4 letters" }),
  model: z.string(),
  year: z.coerce.number(),
  brand: z.string(),
  color: z.string(),
  plate: z.string(),
  renavam: z.string(),
  aquired_year: z.coerce.number(),
});

type SchemaProps = z.infer<typeof formSchema>;

export default function Page() {
  const router = useRouter();
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
  });

  const submitForm = async (values: SchemaProps) => {
    const car: Car = {
      id: "",
      name: values.name,
      model: values.model,
      year: values.year,
      brand: values.brand,
      color: values.color,
      plate: values.plate,
      renavam: values.renavam,
      aquired_year: values.aquired_year,
    };
    await createCar(car);
    router.push("/");
  };

  return (
    <>
      <h2>Add car</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <TextField form={form} name="name" label="Name" />
          <TextField form={form} name="model" label="Model" />
          <TextField form={form} name="year" label="Year" />
          <TextField form={form} name="brand" label="Brand" />
          <TextField form={form} name="color" label="Color" />
          <TextField form={form} name="plate" label="Plate" />
          <TextField form={form} name="renavam" label="Renavam" />
          <TextField form={form} name="aquired_year" label="Aquired in year" />

          <Button type="submit">Create</Button>
        </form>
      </Form>
    </>
  );
}
