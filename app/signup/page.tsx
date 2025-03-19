"use client";

import { signUp } from "@/app/lib/action/auth";
import { passwordValidationRegex } from "@/app/lib/util";
import { TextField } from "@/app/ui/FormFields/TextField";
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
  });

  const submitForm = async (values: SchemaProps) => {
    await signUp(values);
    router.push("/signup/success");
  };

  return (
    <>
      <h2>Create User</h2>

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

            <Button type="submit" className="mt-6">
              Sign up
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
