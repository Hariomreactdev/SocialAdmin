import * as React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { SnackbarCloseReason } from '@mui/material/Snackbar';

const Welcome = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleAlertClose = (event: React.SyntheticEvent) => {
    handleClose(event, 'timeout'); // or whatever fallback reason you want
  };

  React.useEffect(() => {
    // Update the document title using the browser API
    const timer = setTimeout(() => {
      handleClick();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="info"
          variant="filled"
          sx={{ width: '100%', color: 'white' }}
        >
          <AlertTitle>Welcome To Joyers</AlertTitle>
          Glad to have you here! !!!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Welcome;
