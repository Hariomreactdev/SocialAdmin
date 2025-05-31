import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from '@/utils/axios';
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import { TextFieldCustom } from '@/components/forms/theme-elements/elements';
import ParentCard from '@/components/shared/ParentCard';

const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Add Role' }];

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
};

const Create = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post('/api/data/roles', data);
      if (response.status === 201) {
        navigate('/cms/roles-permissions');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <PageContainer title="Add Role" description="This is an inner page">
      {/* Breadcrumb */}
      <Breadcrumb title="Roles" items={BCrumb} />
      {/* End Breadcrumb */}

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <ParentCard title="Add Role">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <Grid container spacing={3}>
                <Grid item lg={6} md={6} xs={12}> */}
              <TextFieldCustom
                label="Role Name"
                name="name"
                control={control}
                rules={{
                  required: 'Role name is required',
                  maxLength: { value: 20, message: 'Max length is 20' },
                }}
                sx={{ mb: '1rem' }}
              />

              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </form>
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Create;
