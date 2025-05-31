import React from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, CardContent, Divider, Box, Button } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { useSelector } from '@/store/Store';
import { AppState } from '@/store/Store';

type Props = {
  title: string;
  create?: string;
  buttonClick?: () => void;
  cardSx?: any;
  cardContentSx?: any;
  footer?: string | JSX.Element;
  children: JSX.Element;
};

const ParentCard = ({
  title,
  create,
  buttonClick,
  cardSx,
  cardContentSx,
  children,
  footer,
}: Props) => {
  const navigate = useNavigate();
  const customizer = useSelector((state: AppState) => state.customizer);

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      sx={{
        padding: 0,
        border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none',
        ...cardSx,
      }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CardHeader title={title} sx={{ py: '10px' }} />
        {create && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              pr: '1.5rem',
            }}
          >
            <Button
              size="small"
              variant="contained"
              sx={{ p: '5px', minWidth: '40px', borderRadius: '5px' }}
              onClick={buttonClick}
            >
              <AddOutlined />
            </Button>
          </Box>
        )}
      </div>
      <Divider />

      <CardContent sx={cardContentSx}>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ''
      )}
    </Card>
  );
};

export default ParentCard;
