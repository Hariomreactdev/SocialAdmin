import React from 'react';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';

const CustomSwitch = styled((props: any) => <Switch size="small" {...props} />)(({ theme }) => ({
  '&.MuiSwitch-root': {
    width: '40px',
    height: '20px',
    padding: 0,
  },
  '& .MuiButtonBase-root': {
    left: '2px',
    padding: 0,
  },
  '& .MuiButtonBase-root.Mui-checked .MuiSwitch-thumb': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSwitch-thumb': {
    width: '20px',
    height: '20px',
    borderRadius: '4px', // Only left side top and bottom
  },
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.grey[200],
    opacity: 1,
    borderRadius: '5px 0 0 5px', // Only left side top and bottom
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.18,
      },
    },
  },
}));

export default CustomSwitch;
