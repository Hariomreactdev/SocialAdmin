// withEntityList.tsx
import { useEffect, useState } from 'react';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ListProps<T> {
  data: T[];
  meta: PaginationMeta;
  isLoading: boolean;
  fetchData: () => Promise<void>;
  setFilter: (filters: Record<string, any>) => void;
  setSort: (sortBy: string, order: 'asc' | 'desc') => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  page: number;
  limit: number;
  sort: { by: string; order: 'asc' | 'desc' };
  filters: Record<string, any>;
}

export function withEntityList<T>(
  WrappedComponent: React.ComponentType<ListProps<T> & any>,
  getListFunction: (params: {
    page: number;
    limit: number;
    sortBy: string;
    order: 'asc' | 'desc';
    filters: Record<string, any>;
  }) => Promise<{
    data: T[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>,
) {
  return function EntityListWrapper(props: any) {
    const [data, setData] = useState<T[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSortState] = useState({ by: 'createdAt', order: 'desc' as 'desc' | 'asc' });
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [reload, setReload] = useState<boolean>(false);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getListFunction({
          page,
          limit,
          sortBy: sort.by,
          order: sort.order,
          filters,
        });

        const { data, pagination } = response;

        setData(data);
        setMeta({
          page: pagination?.currentPage,
          limit: limit,
          total: pagination?.totalItems,
          totalPages: pagination?.totalPages,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const setSort = (by: string, order: 'asc' | 'desc') => setSortState({ by, order });
    const setFilter = (newFilters: Record<string, any>) => setFilters(newFilters);

    useEffect(() => {
      console.log('filters', filters);

      fetchData();
    }, [page, limit, sort, filters, reload]);

    return (
      <WrappedComponent
        {...props}
        data={data}
        meta={meta}
        isLoading={isLoading}
        fetchData={fetchData}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        setSort={setSort}
        sort={sort}
        setFilter={setFilter}
        filters={filters}
        reload={reload}
        setReload={setReload}
      />
    );
  };
}
