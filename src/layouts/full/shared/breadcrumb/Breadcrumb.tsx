import React from 'react';
import { Grid, Typography, Box, Breadcrumbs, Link, Theme, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

import breadcrumbImg from '@/assets/images/breadcrumb/ChatBc.png';
import { IconMathGreater } from '@tabler/icons-react';

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title?: string;
  children?: React.ReactNode;
}

const Breadcrumb = ({ subtitle, items, title, children }: BreadCrumbType) => (
  <Grid
    container
    sx={{
      // backgroundColor: 'primary.light',
      borderRadius: (theme: Theme) => theme.shape.borderRadius / 8,
      p: '0px 25px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Grid item xs={12} sm={6} lg={8} sx={{ mb: 1 }}>
      {/* <Typography variant="h4">{title}</Typography>
      <Typography color="textSecondary" variant="h6" fontWeight={400} mt={0.8} mb={0}>
        {subtitle}
      </Typography> */}
      <Breadcrumbs
        separator={
          <IconMathGreater
            size="15"
            fill="textSecondary"
            fillOpacity={'0.6'}
            style={{ margin: '0 5px' }}
          />
        }
        sx={{ alignItems: 'center', mt: items ? '10px' : '' }}
        aria-label="breadcrumb"
      >
        {items
          ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Link underline="none" color="inherit" component={NavLink} to={item.to}>
                    {item.title}
                  </Link>
                ) : (
                  <Typography color="textPrimary">{item.title}</Typography>
                )}
              </div>
            ))
          : ''}
      </Breadcrumbs>
    </Grid>
    <Grid
      item
      xs={12}
      sm={6}
      lg={4}
      sx={{
        mb: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        startIcon={
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        onClick={() => window.history.back()}
      >
        Back
      </Button>
    </Grid>
    {/* <Grid
      item
      xs={12}
      sm={6}
      lg={4}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'block', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        {children ? (
          <Box sx={{ top: '0px', position: 'absolute' }}>{children}</Box>
        ) : (
          <>
            <Box sx={{ top: '0px', position: 'absolute' }}>
              <img src={breadcrumbImg} alt={breadcrumbImg} width={'165px'} />
            </Box>
          </>
        )}
      </Box>
    </Grid> */}
  </Grid>
);

export default Breadcrumb;
