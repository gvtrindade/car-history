"use client";

import { signUp } from "@/app/lib/action/auth";
import { passwordValidationRegex } from "@/app/lib/util";
import { TextField } from "@/app/ui/FormFields/TextField";
import Title from "@/app/ui/title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" })
      .regex(passwordValidationRegex, {
        message:
          "Password must contain at least: one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    passwordConfirm: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirm;
    },
    { message: "Passwords do not match", path: ["confirmPassword"] }
  );

type SchemaProps = z.infer<typeof formSchema>;

export default function Page() {
  const router = useRouter();
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const submitForm = async (values: SchemaProps) => {
    await signUp(values);
    router.push("/signup/success");
  };

  return (
    <div className="w-2/3 mx-auto">
      <Title>Create User</Title>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="flex flex-col gap-6 md:w-96 md:mx-auto">
            <TextField
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
            <TextField
              name="password"
              label="Password"
              placeholder="Enter password"
            />
            <TextField
              name="passwordConfirm"
              label="Confirm Password"
              placeholder="Confirm your password"
            />

            <div className="flex justify-center gap-6">
              <Button type="button" onClick={() => router.back()}>
                Back
              </Button>
              <Button type="submit">Sign up</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
