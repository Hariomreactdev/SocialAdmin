import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { withEntityList } from '@/hocComponents/withEntityList';
import { ROUTES } from '@/routes/routerPath';

import { Http, ApiPath } from '@/apis';
import EntityListView from '@/components/entity-list-view';
import { TextFieldCustom } from '@/components/forms/theme-elements/elements';

interface DataType {
    _id: string;
    slug: string;
    title: string;
    content: string;
    createdAt: string;
    isActive: boolean;
  }
  

interface DisplayType {
  key: string;
  label: string;
  isSort: boolean;
  width: number;
  badge?: boolean;
}

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
    const response = await Http(ApiPath.cms.list);
    console.log('response', response);
    // const response = await Http(ApiPath.cms.list, {
    //     page: Number(page), // ensure numeric
    //     limit: Number(limit), // ensure numeric
    //     sortBy,
    //     sortOrder: order,
    //     ...filters,
    //   });
  
    const { pages, pagination } = response.data.data;
    return { data: pages, pagination };
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
      key: 'title',
      label: 'Title',
      isSort: true, // Enable sorting for this column
      width: 200,
    },
    {
        key: 'slug',
        label: 'Slug',
        isSort: false,
        width: 200,
      },
      {
        key: 'content',
        label: 'Content',
        isSort: false,
        width: 200,
      },
    {
      key: 'isActive',
      label: 'Status',
      isSort: false, // Enable sorting for this column
      width: 100,
      badge: true,
    },
    {
      key: 'createdAt',
      label: 'Created At',
      isSort: true, // Enable sorting for this column
      width: 150,
    },
  ]);
  const [isFilterClose, setIsFilterClose] = useState(false);
  const navigate = useNavigate();

  const handlerButtonClick = async (action: string, params: any) => {
    switch (action) {
      case 'create':
        navigate(ROUTES.CMS.ADD, { replace: true });
        break;
      case 'edit':
        navigate(ROUTES.CMS.EDIT.replace(':id', params._id), { replace: true });
        break;
      case 'view':
        navigate(ROUTES.CMS.VIEW.replace(':id', params._id), { replace: true });
        break;
      case 'delete':
        try {
          await Http({
            ...ApiPath.cms.delete,
            url: ApiPath.cms.delete.url.replace(':id', params._id), 
          });
          setReload(!reload);
        } catch (error) {
          console.log('error', error);
        }
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
        title={ROUTES.CMS.TITLES.LIST}
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
          placeholder: 'Search...',
          value: filters.search || '',
          onSearchChange: (keywords: React.ChangeEvent<HTMLInputElement>) =>
            setFilter({ ...filters, search: keywords }),
        }}
        buttonSettings={{
          create: true,
          edit: true,
          delete: true,
          view: true,
          status: false,
        }}
        buttonHandlerOnClick={handlerButtonClick}
      />
    </>
  );
};

export default withEntityList(List, getListFunction);
