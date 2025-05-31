import { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Http, ApiPath } from '@/apis';
import { BasicDetails } from '@/components/details';
import { ROUTES } from '@/routes/routerPath';

interface detailsType {
  label: string;
  value: any;
}
const BCrumb = [
  { to: '/', title: 'Home' },
  { to: '/cms/users', title: 'Users' },
  { title: `View User` },
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
              url: ApiPath.user.view.url.replace(':id', id),
            },
            {},
          );
          if (response.status === 200) {
            const { user } = response.data.data;

            setDetails([
              { label: 'First Name', value: user.firstname },
              { label: 'Last Name', value: user.lastname },
              { label: 'Nick Name', value: user.nickname },
              { label: 'Username', value: user.username },
              { label: 'DOB', value: user.dateOfBirth },
              { label: 'Email', value: user.email },
              { label: 'Location', value: user.location },
              { label: 'Joyer Status', value: user.joyerStatus },
              { label: 'Bio', value: user.bio },
              {
                label: 'Email Verified',
                value: (
                  <Chip
                    sx={{
                      bgcolor:
                        user.emailVerified === true
                          ? (theme) => theme.palette.success.light
                          : (theme) => theme.palette.error.light,
                      color:
                        user.emailVerified === true
                          ? (theme) => theme.palette.success.main
                          : (theme) => theme.palette.error.main,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={user.emailVerified ? 'Yes' : 'No'}
                  />
                ),
              },
              {
                label: 'Mobile Verified',
                value: (
                  <Chip
                    sx={{
                      bgcolor:
                        user.mobileVerified === true
                          ? (theme) => theme.palette.success.light
                          : (theme) => theme.palette.error.light,
                      color:
                        user.mobileVerified === true
                          ? (theme) => theme.palette.success.main
                          : (theme) => theme.palette.error.main,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={user.mobileVerified ? 'Yes' : 'No'}
                  />
                ),
              },
              {
                label: 'Identity Verified',
                value: (
                  <Chip
                    sx={{
                      bgcolor:
                        user.is_identity_verified === true
                          ? (theme) => theme.palette.success.light
                          : (theme) => theme.palette.error.light,
                      color:
                        user.is_identity_verified === true
                          ? (theme) => theme.palette.success.main
                          : (theme) => theme.palette.error.main,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={user.is_identity_verified ? 'Yes' : 'No'}
                  />
                ),
              },
              {
                label: 'Status',
                value: (
                  <Chip
                    sx={{
                      bgcolor:
                        user.is_active === true
                          ? (theme) => theme.palette.success.light
                          : (theme) => theme.palette.error.light,
                      color:
                        user.is_active === true
                          ? (theme) => theme.palette.success.main
                          : (theme) => theme.palette.error.main,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={user.is_active ? 'Active' : 'InActive'}
                  />
                ),
              },
              {
                label: 'Skipped',
                value: (
                  <Chip
                    sx={{
                      bgcolor:
                        user.is_skipped === true
                          ? (theme) => theme.palette.success.light
                          : (theme) => theme.palette.error.light,
                      color:
                        user.is_skipped === true
                          ? (theme) => theme.palette.success.main
                          : (theme) => theme.palette.error.main,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={user.is_skipped ? 'Yes' : 'No'}
                  />
                ),
              },
              {
                label: 'Verified',
                value: (
                  <Chip
                    sx={{
                      bgcolor:
                        user.is_status_verified === true
                          ? (theme) => theme.palette.success.light
                          : (theme) => theme.palette.error.light,
                      color:
                        user.is_status_verified === true
                          ? (theme) => theme.palette.success.main
                          : (theme) => theme.palette.error.main,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={user.is_status_verified ? 'Yes' : 'No'}
                  />
                ),
              },
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
        title="View User"
        details={details}
        BCrumb={BCrumb}
        backRoute={ROUTES.USERS.LIST}
      />
    </>
  );
};

export default View;
