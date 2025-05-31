import { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginType } from '@/types/auth/auth';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';

import { TextFieldCustom } from '@/components/forms/theme-elements/elements';
import { fetchAuthUser } from '@/store/apps/User/auth';

type Inputs = {
  email: string;
  password: string;
};

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { control, setValue, handleSubmit } = useForm<Inputs>({
    defaultValues: { email: 'mans@synapseco.com', password: '' },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const resultAction = await dispatch(fetchAuthUser(data) as any);

      if (fetchAuthUser.fulfilled.match(resultAction)) {
        // console.log('Login Successful:', resultAction.payload);
        // toast.success('Login Successful!');
        navigate('/', { replace: true });
      } else {
        setLoginError(resultAction.payload);
      }
    } catch (error: any) {
      // setLoginError(error.message);
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1} align="center">
          {title}
        </Typography>
      ) : null}

      {/* {subtext} */}

      {/* <AuthSocialButtons title="Sign in with" /> */}
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            sign in with
          </Typography>
        </Divider>
      </Box>

      {/* {loginError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>{loginError}</strong>
        </Alert>
      )} */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Box>
            <TextFieldCustom
              label="Email"
              name="email"
              control={control}
              rules={{
                required: 'This field is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              }}
            />
          </Box>
          <Box>
            <TextFieldCustom
              type="password"
              label="Password"
              name="password"
              control={control}
              setOriginalPassword={(value: string) => setValue('password', value)}
              rules={{
                required: 'This field is required',
              }}
            />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              to="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Sign In
          </Button>
        </Box>
      </form>
      {/* {subtitle} */}
    </>
  );
};

export default AuthLogin;
