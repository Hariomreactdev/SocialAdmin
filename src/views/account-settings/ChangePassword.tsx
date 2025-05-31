import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Http, ApiPath } from '@/apis';
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import {
  TextFieldCustom,
  SelectFieldCustom,
  CheckboxFieldCustom,
} from '@/components/forms/theme-elements/elements';
import ParentCard from '@/components/shared/ParentCard';

type Inputs = {
  currentPassword: string;
  newPassword: string;
  confirmpassword: string;
};

const ChangePassword = () => {
  const { id } = useParams();

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Account Settings' },
    { title: `Change Password` },
  ];
  const navigate = useNavigate();
  const {
    getValues,
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await Http(ApiPath.accountSettings.changePassword, data);
      if (response.status === 201 || response.status === 200) {
        reset({ currentPassword: '', newPassword: '', confirmpassword: '' });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <PageContainer title={`Change Password`} description="This is an inner page">
      {/* Breadcrumb */}
      <Breadcrumb title="Users" items={BCrumb} />
      <ParentCard title={`Change Password`} cardSx={{ mt: '10px' }} cardContentSx={{ pt: 0 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2} width={'50%'}>
            <Grid item xs={12}>
              <TextFieldCustom
                type="password"
                label="Current Password"
                name="currentPassword"
                control={control}
                setOriginalPassword={(value: string) => setValue('currentPassword', value)}
                rules={{
                  required: 'This field is required',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                type="password"
                label="New Password"
                info="password"
                name="newPassword"
                control={control}
                setOriginalPassword={(value: string) => setValue('newPassword', value)}
                rules={{
                  required: 'This field is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                    message: 'Invalid Field format',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                type="password"
                label="Confirm Password"
                name="confirmpassword"
                setOriginalPassword={(value: string) => setValue('confirmpassword', value)}
                control={control}
                rules={{
                  required: 'This field is required',
                  validate: (value: string) =>
                    value === getValues('newPassword') || 'Passwords do not match',
                }}
              />
            </Grid>
            <Grid item xs={12} display={'flex'} gap={1} mt={2}>
              <Button type="submit" color="success" variant="contained">
                Submit
              </Button>
              <Button type="button" color="error" variant="contained" onClick={() => reset()}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/cms/users')}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </form>
      </ParentCard>
    </PageContainer>
  );
};

export default ChangePassword;
