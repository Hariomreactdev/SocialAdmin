import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import CustomFormLabel from '../CustomFormLabel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 16;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultipleSelectCheckmarksProps<TFieldValues extends FieldValues>
  extends Omit<SelectProps, 'name'> {
  label?: string;
  name: Path<TFieldValues>;
  control: any;
  defaultValue?: any;
  rules?: object;
  options: string[];
}

const StyledSelect = styled(Select)(({ theme }) => ({
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const MultipleSelectCheckmarks = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  defaultValue,
  rules,
  options,
  ...rest
}: MultipleSelectCheckmarksProps<TFieldValues>) => {
  return (
    <>
      {label && (
        <Box display={'flex'} alignItems="center">
          <CustomFormLabel>{label}</CustomFormLabel>
        </Box>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? []}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <StyledSelect
              fullWidth
              {...field}
              {...rest}
              multiple
              renderValue={(selected: unknown) =>
                Array.isArray(selected) ? (selected as string[]).join(', ') : ''
              }
              MenuProps={MenuProps}
            >
              {options.map((option, ind) => (
                <MenuItem key={ind} value={option}>
                  <Checkbox checked={Array.isArray(field.value) && field.value.includes(option)} />
                  <ListItemText primary={option} />
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

export default MultipleSelectCheckmarks;
