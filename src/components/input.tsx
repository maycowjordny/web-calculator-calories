import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
  options?: { value: string; label: string }[];
};

export function Input({ name, helperText, type, options, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) =>
        type === "radio" ? (
          <RadioGroup
            sx={{ flexDirection: "row" }}
            aria-labelledby={`${name}-label`}
            defaultValue="male"
            name={name}
            value={field.value}
            onChange={(_, value) => field.onChange(value)}
          >
            {options?.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        ) : (
          <TextField
            {...field}
            sx={{
              "& input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]": {
                MozAppearance: "textfield",
                appearance: "textfield",
              },
            }}
            fullWidth
            inputRef={ref}
            type={type}
            value={field.value === 0 ? "" : field.value}
            onKeyDown={(event) => {
              if (
                type === "number" &&
                !/^\d$|^Backspace$|^Delete$/.test(event.key)
              ) {
                event.preventDefault();
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        )
      }
    />
  );
}
