"use client";

import { updatePassword } from "@/app/lib/action/auth";
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
    oldPassword: z.string(),
    password: z
      .string()
      .min(8, {
          error: "Password must be at least 8 characters long"
    })
      .max(20, {
          error: "Password must be at most 20 characters long"
    })
      .regex(passwordValidationRegex, {
          error: "Password must contain at least: one uppercase letter, one lowercase letter, one number, and one special character"
    }),
    passwordConfirm: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirm;
    },
    { path: ["confirmPassword"],
        error: "Passwords do not match"
    }
  );

type SchemaProps = z.infer<typeof formSchema>;

export default function ChangePasswordForm() {
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: { oldPassword: "", password: "", passwordConfirm: "" },
  });

  const router = useRouter();

  const submitForm = async (values: SchemaProps) => {
    await updatePassword(values);
    router.push("/");
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <div className="flex flex-col gap-6 md:items-center">

          <TextField
            name="oldPassword"
            label="Old Password"
            placeholder="Enter old password"
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

          <Button type="submit">Reset password</Button>
        </div>
      </form>
    </Form>
  );
}
