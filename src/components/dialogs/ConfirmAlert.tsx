import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

interface ConfirmAlertProps {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmAlert: FC<ConfirmAlertProps> = ({
  open,
  title = 'Are you sure?',
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button color="error" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmAlert;
