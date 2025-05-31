import { useState } from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CustomFormLabel from '../CustomFormLabel';
import PasswordTooltip from './PasswordTooltip';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormInputProps<TFieldValues extends Record<string, any>> {
  label?: string;
  type?: string;
  info?: string;
  disabled?: boolean;
  placeholder?: string;
  name: Path<TFieldValues>;
  control: any;
  defaultValue?: any;
  setOriginalPassword?: (value: string) => void;
  rules?: object;
}

const TextFieldCustom = styled(
  <TFieldValues extends FieldValues>({
    label,
    type = 'text',
    info,
    disabled,
    placeholder,
    name,
    control,
    rules,
    defaultValue,
    setOriginalPassword,
    ...rest
  }: FormInputProps<TFieldValues>) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    // Determine the input type based on whether it's a password field and visibility state
    const getInputType = () => {
      if (type === 'password') {
        return showPassword ? 'text' : 'password';
      }
      return type;
    };

    // Only show password toggle for password fields
    const showPasswordToggle = type === 'password';

    return (
      <>
        {label && (
          <Box display={'flex'} alignItems="center">
            <CustomFormLabel>
              {label}
              {rules && (rules as any).required && <span style={{ color: 'red' }}> *</span>}
            </CustomFormLabel>
            {info === 'password' && <PasswordTooltip />}
          </Box>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ''}
          rules={rules}
          render={({ field, fieldState: { error } }) => {
            const displaySecureValue =
              type === 'password' && showPassword
                ? '*'.repeat(field.value?.length || 0)
                : field.value;

            // Only call setOriginalPassword if provided, and avoid calling it on every render
            // Use useEffect to avoid infinite render loop
            // eslint-disable-next-line react-hooks/rules-of-hooks
            if (setOriginalPassword) {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              import('react').then(({ useEffect }) => {
                useEffect(() => {
                  setOriginalPassword(field.value);
                  // eslint-disable-next-line
                }, [field.value]);
              });
            }

            return (
              <TextField
                type={getInputType()}
                disabled={disabled}
                fullWidth
                placeholder={placeholder}
                {...field}
                {...rest}
                value={displaySecureValue}
                error={!!error}
                helperText={error ? error.message : ''}
                InputProps={{
                  endAdornment: showPasswordToggle ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ) : undefined,
                }}
              />
            );
          }}
        />
      </>
    );
  },
)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

export default TextFieldCustom;
