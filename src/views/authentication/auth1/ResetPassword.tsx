import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Stack, Button } from '@mui/material';
import LogoIcon from '@/assets/images/logos/logo-icon.svg?react';
import PageContainer from '@/components/container/PageContainer';
import img1 from '@/assets/images/backgrounds/login-bg.svg';
import Logo from '@/layouts/full/shared/logo/Logo';

import AuthResetPassword from '../authForms/AuthResetPassword';

const ResetPassword = () => (
  <PageContainer title="Register" description="this is Register page">
    <Grid container spacing={0} justifyContent="center" sx={{ overflowX: 'hidden' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={7}
        xl={8}
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Box position="relative">
          <Box px={3} py={2}>
            <Logo />
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height={'calc(100vh - 105px)'}
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
              },
            }}
          >
            <img
              src={img1}
              alt="bg"
              style={{
                width: '100%',
                maxWidth: '500px',
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box p={4} sx={{ width: '80%', maxWidth: 500 }}>
          <Box display={'flex'} justifyContent={'center'}>
            <LogoIcon width={50} height={100} />
          </Box>
          <AuthResetPassword
            title="Reset Password"
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Button color="primary" size="large" fullWidth component={Link} to="/auth/login">
                  Back to Login
                </Button>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default ResetPassword;
