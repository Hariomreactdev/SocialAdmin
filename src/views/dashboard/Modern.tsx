import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { ApiPath, Http } from '@/apis';
import PageContainer from '@/components/container/PageContainer';
import TopCards from '@/components/dashboards/modern/TopCards';
// import RevenueUpdates from '@/components/dashboards/modern/RevenueUpdates';
// import YearlyBreakup from '@/components/dashboards/modern/YearlyBreakup';
// import MonthlyEarnings from '@/components/dashboards/modern/MonthlyEarnings';
// import EmployeeSalary from '@/components/dashboards/modern/EmployeeSalary';
// import Customers from '@/components/dashboards/modern/Customers';
// import Projects from '@/components/dashboards/modern/Projects';
// import Social from '@/components/dashboards/modern/Social';
// import SellingProducts from '@/components/dashboards/modern/SellingProducts';
// import WeeklyStats from '@/components/dashboards/modern/WeeklyStats';
import TopPerformers from '@/components/dashboards/modern/TopPerformers';
import Welcome from '@/layouts/full/shared/welcome/Welcome';
import icon1 from '@/assets/images/svgs/icon-connect.svg';
import icon2 from '@/assets/images/svgs/icon-user-male.svg';
import icon3 from '@/assets/images/svgs/icon-briefcase.svg';
import icon4 from '@/assets/images/svgs/icon-mailbox.svg';
import icon5 from '@/assets/images/svgs/icon-favorites.svg';
import icon6 from '@/assets/images/svgs/icon-speech-bubble.svg';

interface cardType {
  href: string;
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
}

const Modern = () => {
  const [countsData, setCountsData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const response = await Http(ApiPath.dashboard.counts);
        const { data } = response.data;
        setCountsData(data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchDashboardCounts();
  }, []);

  const [topcards, setTopcards] = useState<cardType[]>([
    {
      href: '/user-profile',
      icon: icon2,
      title: 'Total Users count',
      digits: '0',
      bgcolor: 'primary',
    },
    {
      href: '/apps/blog/posts',
      icon: icon6,
      title: 'blocked users count',
      digits: '0',
      bgcolor: 'warning',
    },
    {
      href: '/apps/calendar',
      icon: icon3,
      title: 'Total Posts',
      digits: '0',
      bgcolor: 'secondary',
    },
    {
      href: '/apps/calendar',
      icon: icon4,
      title: 'Total Ads',
      digits: '0',
      bgcolor: 'secondary',
    },
  ]);

  useEffect(() => {
    if (countsData) {
      setTopcards([
        {
          href: '/user-profile',
          icon: icon2,
          title: 'Total App Users',
          digits: countsData.users.total?.toLocaleString() ?? '0',
          bgcolor: 'primary',
        },
        {
          href: '/user-profile',
          icon: icon5,
          title: 'Total Admin Users',
          digits: countsData.users.totalAdmins?.toLocaleString() ?? '0',
          bgcolor: 'success',
        },
        {
          href: '/user-profile',
          icon: icon1,
          title: 'Total Last Month Users',
          digits: countsData.users.lastMonthNew?.toLocaleString() ?? '0',
          bgcolor: 'warning',
        },
        {
          href: '/apps/blog/posts',
          icon: icon6,
          title: 'blocked users count',
          digits: '0',
          bgcolor: 'error',
        },
        {
          href: '/apps/calendar',
          icon: icon3,
          title: 'Total Posts',
          digits: countsData.posts.total.generic?.toLocaleString() ?? '0',
          bgcolor: 'secondary',
        },
        {
          href: '/apps/calendar',
          icon: icon3,
          title: 'Total Last Month Posts',
          digits: countsData.posts.thisMonth.generic?.toLocaleString() ?? '0',
          bgcolor: 'info',
        },
        {
          href: '/apps/calendar',
          icon: icon4,
          title: 'Total Ads',
          digits: '0',
          bgcolor: 'primary',
        },
      ]);
    }
  }, [countsData]);

  return (
    <PageContainer title="Modern Dashboard" description="this is Modern Dashboard page">
      <Box>
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <TopCards topcards={topcards} />
          </Grid>
          {/* column */}
          {/* <Grid item xs={12} lg={8}>
            <RevenueUpdates />
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <EmployeeSalary />
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Customers />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Projects />
              </Grid>
              <Grid item xs={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <SellingProducts />
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <WeeklyStats />
          </Grid> */}
          {/* column */}
          <Grid item xs={12} lg={12}>
            <TopPerformers />
          </Grid>
        </Grid>
        {/* column */}
        <Welcome />
      </Box>
    </PageContainer>
  );
};

export default Modern;
