import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconInfoCircle from '@mui/icons-material/Info'; // Replace with your custom icon if needed
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; // Bullet-style icon

const PasswordTooltip = () => {
  const passwordRules = [
    'Between 8 and 16 characters',
    'Must start and end with a letter',
    'Contain at least one uppercase letter',
    'Contain at least one lowercase letter',
    'Include at least one special character',
    'Include at least one number',
  ];
  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            Password must contain:
          </Typography>
          <List dense sx={{ pl: 1 }}>
            {passwordRules.map((rule, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon sx={{ minWidth: 20 }}>
                  <FiberManualRecordIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={rule} />
              </ListItem>
            ))}
          </List>
        </Box>
      }
      placement="right-end"
      arrow
    >
      <IconInfoCircle color="primary" />
    </Tooltip>
  );
};

export default PasswordTooltip;
