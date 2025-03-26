"use client";

import CarData from "@/app/[carId]/CarData";
import { deleteCarById, putCar } from "@/app/lib/action/car";
import { Car } from "@/app/lib/definitions";
import NumberField from "@/app/ui/FormFields/NumberField";
import { TextField } from "@/app/ui/FormFields/TextField";
import Modal from "@/app/ui/Modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getErrorMessage } from "../lib/util";

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
type Props = {
  userId: string;
  car: Car;
  className?: string;
};

export default function CarForm({ userId, car, className = "" }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: car.name,
      model: car.model,
      year: car.year,
      brand: car.brand,
      color: car.color,
      plate: car.plate,
      renavam: car.renavam,
      aquired_year: car.aquired_year,
    },
  });

  async function submitForm(values: SchemaProps) {
    const editedCar: Car = {
      id: car.id,
      name: values.name,
      model: values.model,
      year: values.year,
      brand: values.brand,
      color: values.color,
      plate: values.plate,
      renavam: values.renavam,
      aquired_year: values.aquired_year,
    };

    try {
      await putCar(userId, editedCar);
      setIsEditing(false);
      toast(`Edited ${editedCar.name} successfully`);
      router.refresh();
    } catch (e) {
      toast(getErrorMessage(e));
    }
  }

  async function confirmDelete() {
    await deleteCarById(userId, car.id);
    router.push("/");
  }

  return (
    <div className={className}>
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-6 w-full max-w-xs">
                <TextField name="name" label="Name" />
                <TextField name="model" label="Model" />
                <NumberField name="year" label="Year" />
                <TextField name="brand" label="Brand" />
              </div>
              <div className="flex flex-col gap-6 w-full max-w-xs">
                <TextField name="color" label="Color" />
                <TextField name="plate" label="Plate" />
                <TextField name="renavam" label="Renavam" />
                <NumberField name="aquired_year" label="Aquired in year" />
              </div>
            </div>

            <div className="flex w-full justify-center gap-4 mt-6">
              <Button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <div className="flex w-full justify-center gap-4">
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button onClick={() => setOpen(true)}>Delete</Button>
            <Modal
              title="Delete"
              content={<p>Are you sure you want to delete {car.name}?</p>}
              footer={
                <>
                  <Button onClick={() => confirmDelete()}>Delete</Button>
                </>
              }
              open={open}
              setOpen={setOpen}
            />
          </div>

          <div className="flex justify-center mt-6 text-center sm:gap-6">
            <div className="flex w-full flex-col gap-6">
              <CarData label="Name" data={car.name} />
              <CarData label="Model" data={car.model} />
              <CarData label="Year" data={car.year} />
              <CarData label="Brand" data={car.brand} />
            </div>
            <div className="flex w-full flex-col gap-6">
              <CarData label="Color" data={car.color} />
              <CarData label="Plate" data={car.plate} />
              <CarData label="Renavam" data={car.renavam} />
              <CarData label="Aquired in year" data={car.aquired_year} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
