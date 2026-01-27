"use client";

import { signUp } from "@/app/lib/action/auth";
import { passwordValidationRegex } from "@/app/lib/util";
import { TextField } from "@/app/ui/FormFields/TextField";
import Title from "@/app/ui/title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.email({
      message: "Invalid email address",
    }),
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
    { path: ["passwordConfirm"], message: "Passwords do not match" },
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

  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!hasSignedUp || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hasSignedUp, timeLeft]);

  const submitForm = async (values: SchemaProps) => {
    await signUp(values);
    setHasSignedUp(true);
    setTimeLeft(60);
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const values = form.getValues();
      await signUp(values);
      setTimeLeft(60);
    } catch (error) {
      console.error("Failed to resend email", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-2/3 mx-auto">
      {hasSignedUp ? (
        <div className="flex flex-col gap-4 text-center items-center">
          <Title>Success</Title>
          <p>Thank you for signing up for Car History!</p>
          <p>
            A validation email has been sent to{" "}
            <span className="font-bold">{form.getValues("email")}</span>
          </p>
          <p>Please check your inbox</p>

          <div className="mt-4">
            <Button
              variant="outline"
              onClick={handleResendEmail}
              disabled={timeLeft > 0 || isResending}
              className="w-full sm:w-auto"
            >
              {timeLeft > 0
                ? `Resend Email (${timeLeft}s)`
                : isResending
                  ? "Sending..."
                  : "Resend Email"}
            </Button>
            {timeLeft > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                You can resend the code in {timeLeft} seconds.
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
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
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Back
                  </Button>
                  <Button type="submit">Sign up</Button>
                </div>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
