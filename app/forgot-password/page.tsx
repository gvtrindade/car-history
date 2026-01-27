"use client";

import { requestResetPassword } from "@/app/lib/action/auth";
import { TextField } from "@/app/ui/FormFields/TextField";
import Title from "@/app/ui/title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react"; 
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.email(),
});

type SchemaProps = z.infer<typeof formSchema>;

export default function ForgotPassword() {
  const [messageSent, setMessageSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isResending, setIsResending] = useState(false); 
  
  const [submittedEmail, setSubmittedEmail] = useState(""); 

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: email ? email : "" },
  });

  useEffect(() => {
    if (!messageSent || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [messageSent, timeLeft]);

  const submitForm = async (values: SchemaProps) => {
    try {
      await requestResetPassword(values);
      setSubmittedEmail(values.email);
    } catch (err) {
      if (err instanceof Error) {
        toast(err.message);
      } else {
        toast("Unknonwn error while sending reset email");
      }
      return;
    }

    form.reset();
    setMessageSent(true);
    setTimeLeft(60); 
  };

  const handleResend = async () => {
    if (!submittedEmail) return;
    
    setIsResending(true);
    try {
      await requestResetPassword({ email: submittedEmail });
      setTimeLeft(60);
      toast("Email resent successfully");
    } catch (err) {
       if (err instanceof Error) {
        toast(err.message);
      } else {
        toast("Failed to resend email");
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Title>Forgot Password</Title>

      {messageSent ? (
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="text-green-500">
            Check your email to reset your password!
          </p>
          
          <Button 
            variant="outline"
            onClick={handleResend}
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
              <p className="text-xs text-muted-foreground">
                Wait {timeLeft}s before requesting another email.
              </p>
            )}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <div className="flex flex-col gap-6 md:w-96 md:mx-auto">
              <TextField name="email" label="Email" placeholder="Enter your email" />

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
