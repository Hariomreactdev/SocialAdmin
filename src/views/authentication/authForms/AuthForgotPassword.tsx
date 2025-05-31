import React from 'react';
import { Button, Stack, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Http, ApiPath } from '@/apis';

import { TextFieldCustom } from '@/components/forms/theme-elements/elements';

type Inputs = {
  email: string;
};

const AuthForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const response = await Http(ApiPath.auth.forgot, data);
      if (response.status === 200) {
        navigate('/auth/reset-password', {
          state: {
            email: data.email,
          },
          replace: true,
        });
        // toast.success('Password reset link sent to your email');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack mt={4} spacing={2}>
          <TextFieldCustom
            label="Email"
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            }}
          />
          <Button
            type="submit"
            disabled={loading}
            color="primary"
            variant="contained"
            size="large"
            fullWidth
          >
            Forgot Password
          </Button>
          <Button color="primary" size="large" fullWidth component={Link} to="/auth/login">
            Back to Login
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default AuthForgotPassword;
