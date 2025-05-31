import { Link } from 'react-router-dom';
import { Box, CardContent, Grid, Typography } from '@mui/material';

interface cardType {
  href: string;
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
}

interface TopCardsProps {
  topcards: cardType[];
}

const TopCards = ({ topcards }: TopCardsProps) => {
  return (
    <Grid container spacing={3} mt={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={3} key={i}>
          <Link to={'#'}>
            <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
              <CardContent>
                <img src={topcard.icon} alt={topcard.icon} width="50" />
                <Typography
                  color={topcard.bgcolor + '.main'}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  {topcard.title}
                </Typography>
                <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                  {topcard.digits}
                </Typography>
              </CardContent>
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
