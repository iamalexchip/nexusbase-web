import DemoComponent from '../DemoComponent';
import React, { FC } from 'react';

import { useQuery } from '@apollo/client';
import demoQuery from '../../api/queries/demoQuery';

const Demo: FC = () => {
  const { loading, error, data } = useQuery(demoQuery);

  console.log({ loading, error, data });

  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl mb-5">Demo</p>
      <DemoComponent />
      {error ? (
        <p className="text-red-700">error loading data</p>
      ) : (
        <p>From apollo: {loading ? 'loading' : data.someData.someField}</p>
      )}
    </div>
  );
};

export default Demo;
