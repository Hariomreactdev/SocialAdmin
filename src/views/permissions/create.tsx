import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Http, ApiPath } from '@/apis';
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import {
  TextFieldCustom,
  SelectFieldCustom,
  MultipleSelectCheckMarks,
} from '@/components/forms/theme-elements/elements';
import ParentCard from '@/components/shared/ParentCard';
import { ROUTES } from '@/routes/routerPath';
import { withFormHOC } from '@/hocComponents/withForm';

type PermissionActions = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

type SubModule = {
  moduleName: string;
  actions: PermissionActions;
};

type PermissionType = {
  moduleName: string;
  actions: PermissionActions;
  subModules?: SubModule[];
};

type Inputs = {
  name: string;
  description: string;
  permissions: PermissionType[]; // Array of permission objects
};

const Create = (props: any) => {
  const {
    id,
    breadcrumbItems,
    title,
    control,
    errors,
    getValues,
    setValue,
    handleSubmit,
    reset,
    navigate,
    isEditMode,
  } = props;
  const [modules] = useState<{ label: string; value: string }[]>([
    { label: 'Manage System Settings', value: 'manage_system_settings' },
    { label: 'Manage Roles', value: 'manage_roles' },
    { label: 'Manage Admins', value: 'manage_admin' },
    { label: 'Manage Users', value: 'manage_users' },
    { label: 'Manage Category', value: 'manage_category' },
  ]);

  const onSubmit = async (data: Inputs) => {
    try {
      // const payload = { ...data, action: data.action.join(',') };
      // const response = isEditMode
      //   ? await Http(
      //       {
      //         ...ApiPath.permissions.update,
      //         url: ApiPath.permissions.update.url.replace(':id', id),
      //       },
      //       payload,
      //     )
      //   : await Http(ApiPath.permissions.create, payload);
      // if (response.status === 201 || response.status === 200) {
      //   navigate(ROUTES.PERMISSIONS.LIST);
      // }
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
              ...ApiPath.permissions.view,
              url: ApiPath.permissions.view.url.replace(':id', id),
            },
            {},
          );
          if (response.status === 200) {
            const { permission } = response.data.data;
            if (permission) {
              reset({
                ...permission,
                module: permission.module._id,
                action: permission.action.split(','),
              });
            }
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchDetails();
    }
  }, [id, isEditMode, reset]);

  const updatePermissions = (
    permissions: PermissionType[],
    moduleName: string,
    action: keyof PermissionActions,
    value: boolean,
  ): PermissionType[] => {
    const idx = permissions.findIndex((p) => p.moduleName === moduleName);
    if (idx > -1) {
      // Update existing
      return permissions.map((p, i) =>
        i === idx
          ? {
              ...p,
              actions: {
                ...p.actions,
                [action]: value,
              },
            }
          : p,
      );
    } else {
      // Add new
      return [
        ...permissions,
        {
          moduleName,
          actions: {
            create: false,
            read: false,
            update: false,
            delete: false,
            [action]: value,
          },
        },
      ];
    }
  };

  return (
    <PageContainer title={title} description="This is an inner page">
      <Breadcrumb items={breadcrumbItems} />
      <ParentCard title={title} cardSx={{ mt: '10px' }} cardContentSx={{ pt: 0 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <SelectFieldCustom
                label="Role"
                name="role"
                control={control}
                options={[]}
                rules={{
                  required: 'This field is required',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldCustom label="Description" name="description" control={control} />
            </Grid>
            <Grid item xs={12}>
              <TableContainer
                sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 520, mt: 5 }}
              >
                <Table
                  stickyHeader
                  sx={{
                    whiteSpace: 'nowrap',
                    px: '10px',
                  }}
                  aria-labelledby="tableTitle"
                  size={'small'}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Module</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Create</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Read</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Update</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Delete</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {modules.map((module, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontWeight: 600 }}>
                          <Typography variant="subtitle2" noWrap>
                            {module.label}
                          </Typography>
                        </TableCell>
                        {['create', 'read', 'update', 'delete'].map((perm) => (
                          <TableCell key={perm}>
                            <Checkbox
                              checked={
                                getValues &&
                                getValues(`permissions.${index}.actions.${perm}`) === true
                              }
                              onChange={(e) => {
                                const currentPermissions = getValues
                                  ? getValues('permissions') || []
                                  : [];
                                const updatedPermissions = updatePermissions(
                                  currentPermissions,
                                  module.value,
                                  perm as keyof PermissionActions,
                                  e.target.checked,
                                );
                                setValue && setValue('permissions', updatedPermissions);
                              }}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
                variant="outlined"
                color="secondary"
                onClick={() => navigate(ROUTES.ROLES.LIST)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          {/* <Grid container columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <SelectFieldCustom label="Module" name="module" control={control} options={modules} />
            </Grid>
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

            <Grid item xs={12} md={6}>
              <MultipleSelectCheckMarks
                name="action"
                options={['create', 'update', 'read', 'delete']}
                label="Permissions"
                control={control}
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
                onClick={() => navigate(ROUTES.PERMISSIONS.LIST)}
              >
                Back
              </Button>
            </Grid>
          </Grid> */}
        </form>
      </ParentCard>
    </PageContainer>
  );
};

export default withFormHOC<Inputs>({
  defaultValues: { name: '', description: '', permissions: [] },
  routes: {
    list: ROUTES.PERMISSIONS.LIST,
    listTitle: ROUTES.PERMISSIONS.TITLES.LIST,
    addTitle: ROUTES.PERMISSIONS.TITLES.ADD,
    editTitle: ROUTES.PERMISSIONS.TITLES.EDIT,
    baseTitle: ROUTES.ROOT.TITLES.VIEW,
    basePath: ROUTES.ROOT.BASE,
  },
})(Create);
