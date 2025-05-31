import React from 'react';
import { Box, Switch } from '@mui/material';

import CustomSwitch from '../../theme-elements/CustomSwitch';

type CustomExSwitchProps = {
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
};

const CustomExSwitch = ({ checked, onCheck }: CustomExSwitchProps) => {
  //   console.log('checked', checked);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CustomSwitch
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheck && onCheck(e.target.checked)}
      />

      {/* <CustomSwitch />
        <CustomSwitch disabled defaultChecked />
        <CustomSwitch disabled /> */}
    </Box>
  );
};
export default CustomExSwitch;
