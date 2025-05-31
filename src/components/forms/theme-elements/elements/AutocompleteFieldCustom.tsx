import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import {
  Autocomplete,
  TextField,
  FormControl,
  FormHelperText,
  AutocompleteProps,
} from '@mui/material';
import CustomFormLabel from '../CustomFormLabel';

export interface AutocompleteOption {
  label: string;
  value: string | number;
}

interface FormAutocompleteProps<
  TFieldValues extends FieldValues,
  TOption extends AutocompleteOption,
> extends Omit<
    AutocompleteProps<TOption, false, false, false>,
    'name' | 'renderInput' | 'options' | 'defaultValue'
  > {
  label?: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  defaultValue?: TOption;
  rules?: object;
  options: TOption[];
  placeholder?: string;
}

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-input': {
    padding: '10px 14px',
  },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const AutocompleteFieldCustom = <
  TFieldValues extends FieldValues,
  TOption extends AutocompleteOption,
>({
  label,
  name,
  control,
  defaultValue,
  rules,
  options,
  placeholder,
  ...rest
}: FormAutocompleteProps<TFieldValues, TOption>) => {
  return (
    <>
      {label && <CustomFormLabel>{label}</CustomFormLabel>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as TFieldValues[typeof name]}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <StyledAutocomplete<TOption, false, false, false>
              {...rest}
              options={options}
              value={field.value ?? null}
              onChange={(_, newValue) => field.onChange(newValue)}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              renderInput={(params) => (
                <TextField {...params} placeholder={placeholder} error={!!error} />
              )}
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </>
  );
};

export default AutocompleteFieldCustom;
