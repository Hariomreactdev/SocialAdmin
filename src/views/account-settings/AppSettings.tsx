import { useEffect, useState } from 'react';
import { Grid, Typography, Button, Paper } from '@mui/material';
import { Http, ApiPath } from '@/apis';
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import {
  TextFieldCustom,
  SelectFieldCustom,
  CheckboxFieldCustom,
  SwitchFieldCustom,
} from '@/components/forms/theme-elements/elements';
import ParentCard from '@/components/shared/ParentCard';
import { withFormHOC } from '@/hocComponents/withForm';
import { ROUTES } from '@/routes/routerPath';

type Inputs = {
  general: {
    supportEmail: string;
    supportPhone: string;
    appStoreLink: string;
    playStoreLink: string;
  };
  system: {
    defaultLanguage: string;
    defaultCurrency: string;
    defaultTimeZone: string;
  };
  appControll: {
    maintanance_mode: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
};

const AppSettings = (props: any) => {
  const { breadcrumbItems, title, control, handleSubmit, reset } = props;

  const onSubmit = async (data: Inputs) => {
    try {
      await Http(ApiPath.accountSettings.appSettings, data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await Http(ApiPath.accountSettings.getAppSettings);
        const { settings } = response.data.data;
        reset({
          general: {
            supportEmail: settings.general.supportEmail || '',
            supportPhone: settings.general.supportPhone || '',
            appStoreLink: settings.general.appStoreLink || '',
            playStoreLink: settings.general.playStoreLink || '',
          },
          system: {
            defaultLanguage: settings.system.defaultLanguage || '',
            defaultCurrency: settings.system.defaultCurrency || '',
            defaultTimeZone: settings.system.defaultTimeZone || '',
          },
          appControll: {
            maintanance_mode: settings.appControll.maintanance_mode || false,
          },
          notifications: {
            sms: settings.notifications.sms || false,
            email: settings.notifications.email || false,
            push: settings.notifications.push || false,
          },
        });
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <PageContainer title={title} description="This is an inner page">
      <Breadcrumb items={breadcrumbItems} />
      <ParentCard title={title} cardSx={{ mt: '10px' }} cardContentSx={{ pt: 0 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <TextFieldCustom
                label="Support Email"
                name="general.supportEmail"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldCustom
                label="Support Phone"
                name="general.supportPhone"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldCustom
                label="App Store Link"
                name="general.appStoreLink"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextFieldCustom
                label="Play Store Link"
                name="general.playStoreLink"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper sx={{ mt: 3, boxShadow: 'none' }}>
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: '2px dashed',
                    borderColor: 'grey.300',
                    display: 'inline-block',
                  }}
                >
                  System Configuration
                </Typography>

                <Grid container columnSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <SelectFieldCustom
                      label="Language"
                      name="system.defaultLanguage"
                      control={control}
                      options={[
                        { label: 'English', value: 'English' },
                        { label: 'Spanish', value: 'Spanish' },
                        { label: 'French', value: 'French' },
                        { label: 'German', value: 'German' },
                      ]}
                      rules={{
                        required: 'This field is required',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectFieldCustom
                      label="Time Zone"
                      name="system.defaultTimeZone"
                      control={control}
                      options={[
                        { label: 'IST (India Standard Time)', value: 'IST' },
                        { label: 'GMT (Greenwich Mean Time)', value: 'GMT' },
                        { label: 'EST (Eastern Standard Time)', value: 'EST' },
                        { label: 'PST (Pacific Standard Time)', value: 'PST' },
                      ]}
                      rules={{
                        required: 'This field is required',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectFieldCustom
                      label="Currency"
                      name="system.defaultCurrency"
                      control={control}
                      options={[
                        { label: 'USD', value: 'USD' },
                        { label: 'EUR', value: 'EUR' },
                        { label: 'INR', value: 'INR' },
                        { label: 'GBP', value: 'GBP' },
                      ]}
                      rules={{
                        required: 'This field is required',
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
              <Paper sx={{ mt: 3, boxShadow: 'none' }}>
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: '2px dashed',
                    borderColor: 'grey.300',
                    display: 'inline-block',
                  }}
                >
                  Notification Settings
                </Typography>
                <Grid container spacing={2} ml={0}>
                  <Grid item xs={12} sm={6}>
                    <SwitchFieldCustom
                      label="SMS Notifications"
                      name="notifications.sms"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SwitchFieldCustom
                      label="Email Notifications"
                      name="notifications.email"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SwitchFieldCustom
                      label="Push Notifications"
                      name="notifications.push"
                      control={control}
                    />
                  </Grid>
                </Grid>
              </Paper>

              <Paper sx={{ mt: 3, boxShadow: 'none' }}>
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: '2px dashed',
                    borderColor: 'grey.300',
                    display: 'inline-block',
                    pb: 0.5,
                    mb: 2,
                  }}
                >
                  App Controls
                </Typography>
                <Grid container spacing={2} ml={0}>
                  <Grid item xs={12}>
                    <SwitchFieldCustom
                      label="Maintenance Mode"
                      name="appControll.maintanance_mode"
                      control={control}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} display={'flex'} gap={1} mt={2}>
              <Button type="submit" color="success" variant="contained">
                Save
              </Button>
              <Button type="button" color="warning" variant="contained" onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </ParentCard>
    </PageContainer>
  );
};

export default withFormHOC<Inputs>({
  defaultValues: {
    general: {
      supportEmail: '',
      supportPhone: '',
      appStoreLink: '',
      playStoreLink: '',
    },
    system: {
      defaultLanguage: '',
      defaultCurrency: '',
      defaultTimeZone: '',
    },
    appControll: {
      maintanance_mode: false,
    },
    notifications: {
      sms: false,
      email: false,
      push: false,
    },
  },
  routes: {
    list: ROUTES.ACCOUNT_SETTINGS.APP_SETTINGS,
    listTitle: ROUTES.ACCOUNT_SETTINGS.TITLES.ACCOUNT_SETTINGS,
    addTitle: ROUTES.ACCOUNT_SETTINGS.TITLES.APP_SETTINGS,
    editTitle: '',
    baseTitle: ROUTES.ROOT.TITLES.VIEW,
    basePath: ROUTES.ROOT.BASE,
  },
})(AppSettings);
