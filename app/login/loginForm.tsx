"use client";

import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

type SchemaProps = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function submitForm(values: SchemaProps) {
    const parsedCredentials = z
      .object({
        email: z.email(),
        password: z.string(),
      })
      .safeParse(values);

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;
      await authClient.signIn.email(
        {
          email,
          password,
          rememberMe: true,
        },
        {
          onSuccess: async () => {
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            toast(ctx.error.message);
          },
        },
      );
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
