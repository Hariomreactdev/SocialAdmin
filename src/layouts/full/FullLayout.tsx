import { FC } from 'react';
import { styled, Container, Box, useTheme, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from '@/store/Store';
import { AppState } from '@/store/Store';
import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import Customizer from './shared/customizer/Customizer';
import Navigation from '../full/horizontal/navbar/Navigation';
import HorizontalHeader from '../full/horizontal/header/Header';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: 0,
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayout: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);

  const theme = useTheme();

  return (
    <MainWrapper>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {customizer.isHorizontal ? '' : <Sidebar />}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
          }),
          position: 'relative',
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
        {/* PageContent */}
        {customizer.isHorizontal ? <Navigation /> : ''}
        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}

          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>

          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>

        <Customizer />
        {/* <Box
          display="flex"
          flexDirection="column"
          gap={1}
          sx={{
            px: 8,
            py: 2,
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'transparent',
            zIndex: 1201,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <img
              width={20}
              height={20}
              alt="logo"
              src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18%2028C20.7614%2028%2023.0507%2025.7396%2022.5021%2023.0332C22.2103%2021.5936%2021.7915%2020.1816%2021.2492%2018.8156C20.0934%2015.9038%2018.3992%2013.258%2016.2635%2011.0294C14.1277%208.80083%2011.5922%207.033%208.80172%205.82689C7.55517%205.2881%206.26864%204.86612%204.95736%204.56411C2.26639%203.94432%200%206.23858%200%209V23C0%2025.7614%202.23858%2028%205%2028H18Z'%20fill='%235D87FF'/%3e%3cg%20style='mix-blend-mode:multiply'%3e%3cpath%20d='M14%2028C11.2386%2028%208.94929%2025.7396%209.49792%2023.0332C9.78975%2021.5936%2010.2085%2020.1816%2010.7508%2018.8156C11.9066%2015.9038%2013.6008%2013.258%2015.7365%2011.0294C17.8723%208.80083%2020.4078%207.033%2023.1983%205.82689C24.4448%205.2881%2025.7314%204.86612%2027.0426%204.56411C29.7336%203.94432%2032%206.23858%2032%209V23C32%2025.7614%2029.7614%2028%2027%2028H14Z'%20fill='%2349BEFF'/%3e%3c/g%3e%3c/svg%3e"
            />
            <Typography variant="body1">All rights reserved by Joyers.</Typography>
          </Stack>
        </Box> */}
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
