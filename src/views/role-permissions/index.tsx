import React, { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import EntityListView from '@/components/entity-list-view';

interface DataType {
  id: number;
  name: string;
}

interface DisplayType {
  key: string;
  label: string;
}

const Roles = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [display] = useState<DisplayType[]>([
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Name',
    },
  ]);

  const handlerGetListData = async () => {
    try {
      const response = await axios.get('/api/data/roles');
      console.log('response', response);

      setData(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handlerGetListData();
  }, []);

  return (
    <>
      <EntityListView
        title="Roles"
        data={data}
        display={display}
        urls={{ create: '/cms/roles-permissions/add' }}
      />
    </>
  );
};

export default Roles;
