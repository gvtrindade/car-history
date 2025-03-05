import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

function TextInput({
  placeholder,
  suffix,
  field,
}: {
  placeholder?: string;
  suffix?: ReactNode;
  field: ControllerRenderProps;
}) {
  return (
    <div className="flex gap-2 w-full">
      <Input placeholder={placeholder} {...field} />
      {suffix}
    </div>
  );
}

function PasswordInput({
  placeholder,
  field,
}: {
  placeholder?: string;
  field: ControllerRenderProps;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex gap-2 w-full items-center">
      <Input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...field}
      />
      {show ? (
        <EyeSlashIcon
          onClick={() => setShow(!show)}
          className="w-5 h-5 cursor-pointer select-none"
        />
      ) : (
        <EyeIcon
          onClick={() => setShow(!show)}
          className="w-5 h-5 cursor-pointer select-none"
        />
      )}
    </div>
  );
}

export function TextField({
  form,
  name,
  label,
  placeholder,
}: {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
}) {
  const renderField = (field: ControllerRenderProps) => {
    let inputType = <TextInput field={field} placeholder={placeholder} />;

    if (name.includes("password")) {
      inputType = <PasswordInput field={field} placeholder={placeholder} />;
    }

    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>{inputType}</FormControl>
        <FormMessage />
      </FormItem>
    );
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => renderField(field)}
    />
  );
}
