import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Http, ApiPath } from '@/apis';
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import { TextFieldCustom } from '@/components/forms/theme-elements/elements';
import ParentCard from '@/components/shared/ParentCard';
import { ROUTES } from '@/routes/routerPath';
import { withFormHOC } from '@/hocComponents/withForm';

type Inputs = {
  name: string;
  description: string;
};

const Create = (props: any) => {
  const { id, breadcrumbItems, title, control, errors, handleSubmit, reset, navigate, isEditMode } =
    props;

  const onSubmit = async (data: Inputs) => {
    try {
      const response = isEditMode
        ? await Http(
            {
              ...ApiPath.modules.update,
              url: ApiPath.modules.update.url.replace(':id', id),
            },
            data,
          )
        : await Http(ApiPath.modules.create, data);

      if (response.status === 201 || response.status === 200) {
        navigate(ROUTES.MODULES.LIST);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchDetails = async () => {
        try {
          const response = await Http(
            {
              ...ApiPath.modules.view,
              url: ApiPath.modules.view.url.replace(':id', id),
            },
            {},
          );
          if (response.status === 200) {
            const { module } = response.data.data;
            if (module) {
              reset(module);
            }
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchDetails();
    }
  }, [id, isEditMode, reset]);

  return (
    <PageContainer title={title} description="This is an inner page">
      <Breadcrumb items={breadcrumbItems} />
      <ParentCard title={title} cardSx={{ mt: '10px' }} cardContentSx={{ pt: 0 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <TextFieldCustom
                label="Name"
                name="name"
                control={control}
                rules={{
                  required: 'This field is required.',
                  maxLength: { value: 20, message: 'Max length is 20' },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldCustom
                label="Description"
                name="description"
                control={control}
                sx={{ mb: '1rem' }}
                rules={{
                  required: 'This field is required',
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
                onClick={() => navigate(ROUTES.MODULES.LIST)}
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

export default withFormHOC<Inputs>({
  defaultValues: { name: '', description: '' },
  routes: {
    list: ROUTES.MODULES.LIST,
    listTitle: ROUTES.MODULES.TITLES.LIST,
    addTitle: ROUTES.MODULES.TITLES.ADD,
    editTitle: ROUTES.MODULES.TITLES.EDIT,
    baseTitle: ROUTES.ROOT.TITLES.VIEW,
    basePath: ROUTES.ROOT.BASE,
  },
})(Create);
