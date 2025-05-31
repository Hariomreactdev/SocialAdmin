import { FC } from 'react';
import { useSelector } from '@/store/Store';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import LogoDark from '@/assets/images/logos/dark-logo.svg?react';
import LogoIcon from '@/assets/images/logos/logo-icon.svg?react';
import LogoDarkRTL from '@/assets/images/logos/dark-rtl-logo.svg?react';
import LogoLight from '@/assets/images/logos/light-logo.svg?react';
import LogoLightRTL from '@/assets/images/logos/light-logo-rtl.svg?react';
import { AppState } from '@/store/Store';

const Logo: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse && customizer.isSidebarHover === false ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  // console.log('customizer.isSidebarHover', customizer.isSidebarHover);

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled to="/">
        {customizer.isCollapse && customizer.isSidebarHover === false ? (
          <LogoIcon width={40} height={customizer.TopbarHeight} />
        ) : (
          <LogoDark height={customizer.TopbarHeight} />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled to="/">
      {customizer.isCollapse ? (
        <LogoIcon height={customizer.TopbarHeight} />
      ) : (
        <LogoDark height={customizer.TopbarHeight} />
      )}
    </LinkStyled>
  );
};

export default Logo;
