import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '@/components/shared/ParentCard';

interface BreadcrumbItem {
  title: string;
  to?: string;
}

interface BasicDetailsProps {
  title: string;
  details: { label: string; value: string | React.ReactNode }[]; // Array of objects with label and value properties (string or component)
  BCrumb: BreadcrumbItem[];
  backRoute: string;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({ title, details, BCrumb, backRoute }) => {
  const navigate = useNavigate();
  return (
    <PageContainer title={`${title}`} description="This is an inner page">
      {/* Breadcrumb */}
      <Breadcrumb title="Users" items={BCrumb} />
      <ParentCard title={title} cardSx={{ mt: '10px' }} cardContentSx={{}}>
        <Grid container spacing={2}>
          {(details ?? []).length ? (
            details.map((detail, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>{detail.label}:</strong>{' '}
                  {typeof detail.value === 'string' &&
                  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(detail.value)
                    ? new Date(detail.value).toLocaleString(undefined, {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                    : detail.value}
                </div>
              </Grid>
            ))
          ) : (
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={120}
            >
              Loading...
            </Grid>
          )}
          <Grid item xs={12} display={'flex'} gap={1} mt={2}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate(backRoute)}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default BasicDetails;
