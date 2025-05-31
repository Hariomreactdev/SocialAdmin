import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { withEntityList } from '@/hocComponents/withEntityList';

import { Http, ApiPath } from '@/apis';
import EntityListView from '@/components/entity-list-view';
import { TextFieldCustom } from '@/components/forms/theme-elements/elements';
import { ConfirmAlert } from '@/components/dialogs';
import { ROUTES } from '@/routes/routerPath';

interface DataType {
  id: number;
  module: string;
  action: string;
  name: string;
  description: string;
}

interface DisplayType {
  key: string;
  label: string;
  isSort: boolean;
  width?: number;
  badge?: boolean;
}

type Inputs = {
  module: string;
  action: string;
  name: string;
  description: string;
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
  const response = await Http(ApiPath.permissions.list, {
    page,
    limit,
    sort: sortBy,
    sortOrder: order,
    ...filters,
  });

  const { permissions, pagination } = response.data.data;
  return {
    data: permissions,
    pagination,
  };
};

const List = ({
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
      key: 'module.name',
      label: 'Role Name',
      isSort: false, // Enable sorting for this column
      width: 250,
    },
    {
      key: 'description',
      label: 'Description',
      isSort: false, // Enable sorting for this column
      width: 350,
    },
    {
      key: 'createdAt',
      label: 'Created At',
      isSort: true, // Enable sorting for this column
      width: 200,
    },
  ]);
  const [isFilterClose, setIsFilterClose] = useState(false);
  const navigate = useNavigate();

  const handlerButtonClick = async (action: string, params: any) => {
    switch (action) {
      case 'create':
        navigate(ROUTES.PERMISSIONS.ADD, { replace: true });
        break;
      case 'edit':
        navigate(ROUTES.PERMISSIONS.EDIT.replace(':id', params._id), { replace: true });
        break;
      case 'view':
        navigate(ROUTES.PERMISSIONS.VIEW.replace(':id', params._id), { replace: true });
        break;
      case 'delete':
        // try {
        //   await Http({
        //     ...ApiPath.category.delete,
        //     url: ApiPath.category.delete.url.replace(':id', params._id),
        //   });
        //   setReload(!reload);
        // } catch (error) {
        //   console.log('error', error);
        // }
        break;
      case 'status':
        // try {
        //   await Http(
        //     {
        //       ...ApiPath.user.status,
        //       url: ApiPath.user.status.url.replace(':id', params.id),
        //     },
        //     { status: !params.is_active },
        //   );
        //   setReload(!reload);
        // } catch (error) {
        //   console.log('error', error);
        // }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <EntityListView
        title={ROUTES.PERMISSIONS.TITLES.LIST}
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
          placeholder: `Search`,
          value: filters.search || '',
          onSearchChange: (keywords: React.ChangeEvent<HTMLInputElement>) =>
            setFilter({ ...filters, search: keywords }),
        }}
        setting={{ srNo: false, checkbox: false }}
        buttonSettings={{
          create: true,
          edit: true,
          delete: true,
          view: false,
          status: false,
        }}
        buttonHandlerOnClick={handlerButtonClick}
      />
    </>
  );
};

export default withEntityList(List, getListFunction);
