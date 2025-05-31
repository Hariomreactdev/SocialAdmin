import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Http, ApiPath } from '@/apis';
import { BasicDetails } from '@/components/details';
import { ROUTES } from '@/routes/routerPath';

interface detailsType {
  label: string;
  value: any;
}

const BCrumb = [
  { to: `${ROUTES.ROOT.BASE}`, title: ROUTES.ROOT.TITLES.VIEW },
  { to: `${ROUTES.CATEGORY.LIST}`, title: `${ROUTES.CATEGORY.TITLES.LIST}` },
  { title: `${ROUTES.CATEGORY.TITLES.VIEW}` },
];

const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState<detailsType[]>([]);
  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          const response = await Http(
            {
              ...ApiPath.user.view,
              url: ApiPath.category.view.url.replace(':id', id),
            },
            {},
          );
          if (response.status === 200) {
            const { data } = response.data;
            setDetails([
              { label: 'Name', value: data.title },
              { label: 'Description', value: data.description },
              { label: 'Status', value: data.status ? 'Active' : 'Inactive' },
            ]);
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchDetails();
    }
  }, [id]);

  return (
    <>
      <BasicDetails
        title={ROUTES.CATEGORY.TITLES.VIEW}
        details={details}
        BCrumb={BCrumb}
        backRoute={ROUTES.CATEGORY.LIST}
      />
    </>
  );
};

export default View;
