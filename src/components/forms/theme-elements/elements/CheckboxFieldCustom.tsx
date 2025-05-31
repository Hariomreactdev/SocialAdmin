import { Controller, FieldValues, Path } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  CheckboxProps,
} from '@mui/material';
import CustomFormLabel from '../CustomFormLabel';

interface FormCheckboxProps<TFieldValues extends FieldValues>
  extends Omit<CheckboxProps, 'name' | 'defaultValue'> {
  label?: string;
  name: Path<TFieldValues>;
  control: any;
  defaultValue?: boolean;
  rules?: object;
  checkboxLabel?: string;
}

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

const CheckboxFieldCustom = <TFieldValues extends FieldValues>({
  label,
  checkboxLabel,
  name,
  control,
  defaultValue = false,
  rules,
  ...rest
}: FormCheckboxProps<TFieldValues>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <FormControl error={!!error}>
            <FormControlLabel
              control={<StyledCheckbox {...field} checked={!!field.value} {...rest} />}
              label={
                <>
                  {checkboxLabel}
                  {label && (
                    <span>
                      <CustomFormLabel style={{ display: 'inline', margin: 0 }}>
                        {label}
                      </CustomFormLabel>
                    </span>
                  )}
                </>
              }
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
      {/* <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <FormControl error={!!error}>
            <FormControlLabel
              control={<StyledCheckbox {...field} checked={!!field.value} {...rest} />}
              label={checkboxLabel}
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      /> */}
    </>
  );
};

export default CheckboxFieldCustom;
