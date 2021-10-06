import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import { View } from '../../interfaces/store/views';
import TableView from '../views/TableView';

type Props = { view: View };

const ViewFactory: FC<Props> = ({ view }) => {
  const { collection } = useAppSelector(({ collections }) => ({
    collection: collections.data.collection,
  }));

  if (!collection || !view) {
    return <div>loading view</div>;
  }

  const viewProps = { collection, view };

  if (view.viewType === 'table') {
    return <TableView {...viewProps} />;
  }

  return <div>View type error</div>;
};

export default ViewFactory;
