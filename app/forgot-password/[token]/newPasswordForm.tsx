"use client";

import { resetPassword } from "@/app/lib/action/auth";
import { getErrorMessage, passwordValidationRegex } from "@/app/lib/util";
import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
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

export default function NewPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", passwordConfirm: "" },
  });

  const submitForm = async (values: SchemaProps) => {
    try {
      await resetPassword(values, token);
      toast("Password reset successfully");
      router.push("/login");
    } catch (e) {
      toast(getErrorMessage(e));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <div className="flex flex-col gap-6 md:items-center">
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
