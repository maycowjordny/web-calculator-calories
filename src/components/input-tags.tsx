import { SessionProps } from "@/interface/session";
import Autocomplete from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

type Props = TextFieldProps & {
  name: string;
  options?: { value: string; label: string }[];
  session: SessionProps | null;
};

export default function InputTags({
  name,
  helperText,
  type,
  options,
  disabled,
  session,
  ...other
}: Props) {
  const { control, setValue } = useFormContext();
  const [tags, setTags] = useState<string[]>([]);
  const maxTags = 5;

  useEffect(() => {
    if (disabled) {
      setTags([]);
      setValue(name, []);
    }
  }, [disabled, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          freeSolo
          disabled={disabled}
          options={options?.map((option) => option.label) || []}
          value={session?.isPaid ? tags : []}
          onChange={(event, newValue) => {
            if (newValue.length <= maxTags) {
              setTags(newValue);
              field.onChange(newValue);
            }
            if (newValue.length == 5)
              toast.info("Só é possível colocar 5 alimentos");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              {...other}
              disabled={disabled}
              value={session?.isPaid ? tags : []}
              error={!!error}
              helperText={error ? error?.message : helperText}
              placeholder="Digite e pressione Enter"
            />
          )}
        />
      )}
    />
  );
}
