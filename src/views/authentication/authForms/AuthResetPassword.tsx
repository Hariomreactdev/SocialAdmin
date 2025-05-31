import React, { useEffect } from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { resetPasswordType } from '@/types/auth/auth';
import { Http, ApiPath } from '@/apis';
import { ROUTES } from '@/routes/routerPath';

import { TextFieldCustom } from '@/components/forms/theme-elements/elements';

type Inputs = {
  email: string;
  code: string;
  newPassword: string;
  cpassword: string;
};

const AuthResetPassword = ({ title, subtitle }: resetPasswordType) => {
  const location = useLocation();
  const state = location.state as { email?: string };
  // console.log('state', state.email);

  const navigate = useNavigate();
  const {
    register,
    getValues,
    setValue,
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
      data.email = state?.email || 'mans@synapseco.com';
      const response = await Http(ApiPath.auth.reset, data);
      if (response.status === 200) {
        reset({ email: '', code: '', newPassword: '', cpassword: '' });
        navigate(ROUTES.AUTH.LOGIN);
        //  toast.success('Password reset link sent to your email');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!state?.email) {
      setValue('email', state?.email || 'mans@synapseco.com');
      // navigate('/auth/forgot-password');
    }
  }, [state]);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1} align="center">
          {title}
        </Typography>
      ) : null}

      {getValues('email') ? (
        <Typography fontWeight="500" variant="h6" mt={2}>
          {getValues('email')}
        </Typography>
      ) : null}

      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mb={3}>
            <TextFieldCustom
              label="New Password"
              info="password"
              name="newPassword"
              control={control}
              type="password"
              rules={{
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                  message: 'Invalid Password format',
                },
              }}
            />
            <TextFieldCustom
              type="password"
              label="Confirm Password"
              name="cpassword"
              control={control}
              rules={{
                required: 'Confirm is required',
                validate: (value: string) =>
                  value === getValues('newPassword') || 'Passwords do not match',
              }}
            />
            <TextFieldCustom
              label="Verification Code"
              name="code"
              control={control}
              rules={{
                required: 'Confirm is required',
              }}
            />
          </Stack>
          <Button type="submit" color="primary" variant="contained" size="large" fullWidth>
            Reset Password
          </Button>
        </form>
      </Box>

      {subtitle}
    </>
  );
};

export default AuthResetPassword;
