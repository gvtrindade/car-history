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
import { ControllerRenderProps, useFormContext } from "react-hook-form";

function TextInput({
  field,
  placeholder,
  suffix,
  disabled,
}: {
  field: ControllerRenderProps;
  placeholder?: string;
  suffix?: ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-2 w-full">
      <Input {...field} placeholder={placeholder} disabled={disabled} />
      {suffix}
    </div>
  );
}

function PasswordInput({
  field,
  placeholder,
  disabled,
}: {
  field: ControllerRenderProps;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex gap-2 w-full items-center">
      <Input
        {...field}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
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
  name,
  label,
  placeholder,
  disabled = false,
}: {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  const { control } = useFormContext();
  const renderField = (field: ControllerRenderProps) => {
    let inputType = (
      <TextInput field={field} placeholder={placeholder} disabled={disabled} />
    );

    if (name.includes("password")) {
      inputType = (
        <PasswordInput
          field={field}
          placeholder={placeholder}
          disabled={disabled}
        />
      );
    }

    return (
      <FormItem>
        <FormLabel className="font-bold">{label}</FormLabel>
        <FormControl>{inputType}</FormControl>
        <FormMessage />
      </FormItem>
    );
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => renderField(field)}
    />
  );
}
