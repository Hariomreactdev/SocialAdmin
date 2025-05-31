import { Controller, FieldValues, Path } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Select, MenuItem, SelectProps, FormHelperText, FormControl } from '@mui/material';
import CustomFormLabel from '../CustomFormLabel';

interface FormSelectProps<TFieldValues extends FieldValues> extends Omit<SelectProps, 'name'> {
  label?: string;
  name: Path<TFieldValues>;
  control: any;
  defaultValue?: any;
  rules?: object;
  options: { label: string; value: string | number }[];
}

const StyledSelect = styled(Select)(({ theme }) => ({
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const SelectFieldCustom = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  defaultValue,
  rules,
  options,
  ...rest
}: FormSelectProps<TFieldValues>) => {
  return (
    <>
      <CustomFormLabel>
        {label} {rules && (rules as any).required && <span style={{ color: 'red' }}> *</span>}
      </CustomFormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? ''}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <StyledSelect {...field} {...rest}>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledSelect>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </>
  );
};

export default SelectFieldCustom;
