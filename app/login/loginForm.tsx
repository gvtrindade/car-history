"use client";

import { authenticate } from "@/app/lib/action/auth";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextField } from "../ui/FormFields/TextField";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SchemaProps = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitForm(values: SchemaProps) {
    try {
      await authenticate(values);
    } catch (e) {
      // Show toast
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <h1 className={`text-2xl`}>Please log in to continue</h1>

        <div className="w-full">
          <div>
            <TextField name="email" label="Email" placeholder="Enter email" />
          </div>

          <div className="mt-4">
            <TextField
              name="password"
              label="Password"
              placeholder="Enter password"
            />
          </div>
        </div>
        <Button className="mt-4 w-full">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </form>
    </Form>
  );
}
