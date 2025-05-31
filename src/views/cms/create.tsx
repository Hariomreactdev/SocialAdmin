import { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type Inputs = {
  parentId: string | null;
  title: string;
  description: string;
  status: boolean;
};

const CMSForm = (props: any) => {
  const {
    id,
    breadcrumbItems,
    title,
    control,
    errors,
    handleSubmit,
    reset,
    getValues,
    navigate,
    isEditMode,
  } = props;

  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
  const [data, setData] = useState('');

  const onSubmit = async (data: Inputs) => {
    try {
      const response = isEditMode
        ? await Http(
            {
              ...ApiPath.cms.update,
              url: ApiPath.cms.update.url.replace(':id', id),
            },
            data,
          )
        : await Http(ApiPath.cms.create, data);

      if (response.status === 201 || response.status === 200) {
        navigate(ROUTES.CMS.LIST);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

//   useEffect(() => {
//     if (isEditMode) {
//       const fetchDetails = async () => {
//         try {
//           const response = await Http(
//             {
//               ...ApiPath.cms.view,
//               url: ApiPath.cms.view.url.replace(':id', id),
//             },
//             {},
//           );
//           if (response.status === 200) {
//             const { data } = response.data;
//             if (data) {
//               reset({
//                 ...data,
//                 parentId: data.parentId._id,
//               });
//             }
//           }
//         } catch (error) {
//           console.log('error', error);
//         }
//       };
//       fetchDetails();
//     }
//     const fetchCategories = async () => {
//       try {
//         const response = await Http(ApiPath.cms.list, {
//           limit: 100,
//         });

//         const { categories } = response.data.data;
//         setCategories(
//           categories.map((mod: { _id: string; title: string }) => ({
//             value: mod._id,
//             label: mod.title,
//           })),
//         );
//       } catch (error) {
//         console.log('error', error);
//       }
//     };
//     fetchCategories();
//   }, [id, isEditMode, reset]);

  return (
    <PageContainer title={title} description="This is an inner page">
      <Breadcrumb items={breadcrumbItems} />
      <ParentCard title={title} cardSx={{ mt: '10px' }} cardContentSx={{ pt: 0 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2}>
          <Grid item xs={12} md={6}>
              <TextFieldCustom
                label="Title"
                name="title"
                control={control}
                rules={{
                  required: 'This field is required',
                  maxLength: { value: 20, message: 'Max length is 20' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectFieldCustom
                label="Type"
                name="type"
                control={control}
                options={categories}
              />
            </Grid>
           
                        import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

                        <Grid item xs={12} md={10} p={5}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={data}
                                onChange={(event: any, editor: any) => {
                                    const newData = editor.getData();
                                    setData(newData);
                                }}
                            />
                        </Grid>
        

            <Grid item xs={12} display={'flex'} gap={1} mt={2}>
              <Button type="submit" color="success" variant="contained">
                Submit
              </Button>
              <Button type="button" color="warning" variant="contained" onClick={() => reset()}>
                Reset
              </Button>
              <Button
                type="button"
                color="error"
                variant="contained"
                onClick={() => navigate(ROUTES.CATEGORY.LIST)}
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
    parentId: '',
    title: '',
    description: '',
    status: false,
  },
  routes: {
    list: ROUTES.CMS.LIST,
    listTitle: ROUTES.CMS.TITLES.LIST,
    addTitle: ROUTES.CMS.TITLES.ADD,
    editTitle: ROUTES.CMS.TITLES.EDIT,
    baseTitle: ROUTES.CMS.TITLES.VIEW,
    basePath: ROUTES.ROOT.BASE,
  },
})(CMSForm);
