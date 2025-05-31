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
import { withFormHOC } from '@/hocComponents/withForm';
import { ROUTES } from '@/routes/routerPath';

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  bio: string;
};

const Create = (props: any) => {
  const {
    id,
    breadcrumbItems,
    title,
    control,
    errors,
    handleSubmit,
    reset,
    setValue,
    getValues,
    navigate,
    isEditMode,
  } = props;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = id
        ? await Http(
            {
              ...ApiPath.user.update,
              url: ApiPath.user.update.url.replace(':id', id),
            },
            data,
          )
        : await Http(ApiPath.subadmins.create, data);
      if (response.status === 201 || response.status === 200) {
        navigate(ROUTES.ADMINS.LIST);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await Http(
            {
              ...ApiPath.user.view,
              url: ApiPath.user.view.url.replace(':id', id),
            },
            {},
          );
          if (response.status === 200) {
            const { user } = response.data.data;
            reset({
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              bio: user.bio,
            });
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchUser();
    }
  }, [id, reset]);

  return (
    <PageContainer title={title} description="This is an inner page">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      <ParentCard title={title} cardSx={{ mt: '10px' }} cardContentSx={{ pt: 0 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <TextFieldCustom
                label="First Name"
                name="firstname"
                control={control}
                rules={{
                  required: 'This field is required.',
                  maxLength: { value: 20, message: 'Max length is 20' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldCustom
                label="Last Name"
                name="lastname"
                control={control}
                rules={{
                  required: 'This field is required.',
                  maxLength: { value: 20, message: 'Max length is 20' },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldCustom
                label="Email"
                name="email"
                control={control}
                rules={{
                  required: 'This field is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid  format',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldCustom
                type="password"
                label="Password"
                info="password"
                name="password"
                control={control}
                setOriginalPassword={(value: string) => setValue('password', value)}
                rules={{
                  required: 'This field is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                    message: 'Invalid Field format',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldCustom
                label="Bio"
                name="bio"
                control={control}
                sx={{ mb: '1rem' }}
                rules={{
                  required: 'This field is required',
                }}
              />
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <CheckboxFieldCustom
                label="Active"
                name="active"
                control={control}
                defaultValue={false}
                checkboxLabel="Is Active"
              />
            </Grid> */}

            <Grid item xs={12} display={'flex'} gap={1} mt={2}>
              <Button type="submit" color="success" variant="contained">
                Submit
              </Button>
              <Button type="button" color="warning" variant="contained" onClick={() => reset()}>
                Reset
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/cms/users')}
              >
                Cancel
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
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    bio: '',
  },
  routes: {
    list: ROUTES.ADMINS.LIST,
    listTitle: ROUTES.ADMINS.TITLES.LIST,
    addTitle: ROUTES.ADMINS.TITLES.ADD,
    editTitle: ROUTES.ADMINS.TITLES.EDIT,
    baseTitle: ROUTES.ROOT.TITLES.VIEW,
    basePath: ROUTES.ROOT.BASE,
  },
})(Create);
