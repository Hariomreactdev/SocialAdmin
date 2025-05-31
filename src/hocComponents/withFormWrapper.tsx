import { ReactNode, useRef } from 'react';
import { Grid, Button } from '@mui/material';

const withFormWrapper = (WrappedComponent: React.ComponentType) => {
  return function FormWrapper() {
    return (
      <form>
        <Grid container columnSpacing={2}>
          <WrappedComponent />
          <Grid item xs={12} display="flex" gap={1} mt={2}>
            <Button type="submit" color="success" variant="contained">
              Submit
            </Button>
            <Button type="reset" color="error" variant="contained">
              Cancel
            </Button>
            <Button variant="outlined" color="secondary">
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };
};

export default withFormWrapper;
