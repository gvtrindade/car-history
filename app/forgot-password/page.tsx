"use client";

import { forgotPassword } from "@/app/lib/action/auth";
import { TextField } from "@/app/ui/FormFields/TextField";
import Title from "@/app/ui/title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
});

type SchemaProps = z.infer<typeof formSchema>;

export default function ForgotPassword() {
  const [messageSent, setMessageSent] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: email ? email : "" },
  });

  const submitForm = async (values: SchemaProps) => {
    await forgotPassword(values);
    form.reset();
    setMessageSent(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <Title>Forgot Password</Title>

      {messageSent ? (
        <p className="text-green-500">
          Check your email to reset your password!
        </p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <div className="flex flex-col gap-6 md:w-96 md:mx-auto">
              <TextField name="email" label="Email" />

              <Button type="submit" className="mt-6">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
