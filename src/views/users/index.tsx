import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { withEntityList } from '@/hocComponents/withEntityList';

import { Http, ApiPath } from '@/apis';
import EntityListView from '@/components/entity-list-view';
import { TextFieldCustom } from '@/components/forms/theme-elements/elements';
import { ROUTES } from '@/routes/routerPath';

interface DataType {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  location: string;
  is_active: string;
}

interface DisplayType {
  key: string;
  label: string;
  isSort: boolean;
  width?: number;
  badge?: boolean;
}

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
};

const FilterComponent = ({
  onClose,
  getFilters,
  setFilter,
}: {
  onClose: () => void;
  getFilters: Record<string, any>;
  setFilter: (filters: Record<string, any>) => void;
}) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFilter(data);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      firstname: '',
      lastname: '',
      email: '',
      department: '',
    };
    reset(resetFilters);
    setFilter(resetFilters);
  };

  const textW = '20rem';

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Users's Filter
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}>
          <TextFieldCustom
            sx={{ width: `${textW}` }}
            placeholder="First Name"
            name="firstname"
            defaultValue={getFilters.firstname}
            control={control}
          />
          <TextFieldCustom
            sx={{ width: `${textW}` }}
            placeholder="Last Name"
            name="lastname"
            defaultValue={getFilters.lastname}
            control={control}
          />
          <TextFieldCustom
            sx={{ width: `${textW}` }}
            placeholder="Email"
            defaultValue={getFilters.email}
            name="email"
            control={control}
          />
          <TextFieldCustom
            sx={{ width: `${textW}` }}
            placeholder="Department"
            defaultValue={getFilters.department}
            name="department"
            control={control}
          />
          <Box sx={{ width: `${textW}` }} display={'flex'} justifyContent={'end'} gap={1} mt={2}>
            <Button type="submit" size="small" color="success" variant="contained">
              Apply
            </Button>
            <Button size="small" color="error" variant="contained" onClick={handleReset}>
              Reset
            </Button>
            <Button type="button" variant="outlined" color="secondary" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const getListFunction = async ({
  page,
  limit,
  sortBy,
  order,
  filters,
}: {
  page: number;
  limit: number;
  sortBy: string;
  order: 'asc' | 'desc';
  filters: Record<string, any>;
}) => {
  const response = await Http(ApiPath.user.list, {
    page,
    limit,
    sort: sortBy,
    sortOrder: order,
    ...filters,
  });

  const { users, pagination } = response.data.data;
  return { data: users, pagination };
};

const Users = ({
  data,
  meta,
  isLoading,
  page,
  limit,
  setPage,
  setLimit,
  sort,
  setSort,
  filters,
  setFilter,
  reload,
  setReload,
}: {
  data: DataType[];
  meta: PaginationMeta;
  isLoading: boolean;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  sort: { by: string; order: 'asc' | 'desc' };
  setSort: (sort: string) => void;
  filters: Record<string, any>;
  setFilter: (filters: Record<string, any>) => void;
  reload: boolean;
  setReload: (reload: boolean) => void;
}) => {
  const [display] = useState<DisplayType[]>([
    {
      key: 'firstname',
      label: 'First Name',
      isSort: true, // Enable sorting for this column
      width: 150,
    },
    {
      key: 'lastname',
      label: 'Last Name',
      isSort: true, // Enable sorting for this column
      width: 150,
    },
    {
      key: 'email',
      label: 'Email',
      isSort: true, // Enable sorting for this column
      width: 200,
    },
    {
      key: 'username',
      label: 'Username',
      isSort: false,
      width: 100,
    },
    {
      key: 'is_active',
      label: 'Status',
      isSort: false,
      width: 100,
      badge: true,
    },
    {
      key: 'createdAt',
      label: 'Created At',
      isSort: true, // Enable sorting for this column
      width: 250,
    },
  ]);
  const [isFilterClose, setIsFilterClose] = useState(false);
  const navigate = useNavigate();

  const handlerButtonClick = async (action: string, params: any) => {
    switch (action) {
      case 'create':
        navigate(ROUTES.USERS.ADD, { replace: true });
        break;
      case 'edit':
        navigate(ROUTES.USERS.EDIT.replace(':id', params._id), { replace: true });
        break;
      case 'view':
        navigate(ROUTES.USERS.VIEW.replace(':id', params._id), { replace: true });
        break;
      // case 'delete':
      //   try {
      //     await Http(
      //       {
      //         ...ApiPath.user.status,
      //         url: ApiPath.user.status.url.replace(':id', params.id),
      //       },
      //       { status },
      //     );
      //     setReload(!reload);
      //   } catch (error) {
      //     console.log('error', error);
      //   }
      //   break;
      case 'status':
        try {
          await Http(
            {
              ...ApiPath.user.status,
              url: ApiPath.user.status.url.replace(':id', params._id),
            },
            { status: !params.is_active },
          );
          setReload(!reload);
        } catch (error) {
          console.log('error', error);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <EntityListView
        // isFilterClose={isFilterClose}
        // filterComponent={
        //   <FilterComponent
        //     onClose={() => {
        //       setIsFilterClose(true);
        //       setTimeout(() => {
        //         setIsFilterClose(false);
        //       }, 1000);
        //     }}
        //     setFilter={setFilter}
        //     getFilters={filters}
        //   />
        // }
        title={ROUTES.USERS.TITLES.LIST}
        data={data}
        display={display}
        isLoading={isLoading}
        currentPage={meta.page}
        totalPages={meta.totalPages}
        totalCount={meta.total}
        pageSize={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSortChange={setSort}
        sort={sort}
        search={{
          placeholder: `Search...`,
          value: filters.search || '',
          onSearchChange: (keywords: React.ChangeEvent<HTMLInputElement>) =>
            setFilter({ ...filters, search: keywords }),
        }}
        setting={{ srNo: false, checkbox: false }}
        buttonSettings={{
          create: false,
          edit: true,
          delete: false,
          view: true,
          status: true,
        }}
        buttonHandlerOnClick={handlerButtonClick}
      />
    </>
  );
};

export default withEntityList(Users, getListFunction);
