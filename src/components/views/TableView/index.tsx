import React, { FC } from 'react';
import { Collection } from '../../../interfaces/store/collections';
import { View } from '../../../interfaces/store/views';
import TableHeader from './TableHeader';

type Props = {
  collection: Collection;
  view: View;
};

const TableView: FC<Props> = ({ collection, view }) => {
  return (
    <table>
      <TableHeader collection={collection} view={view} />
    </table>
  );
};

export default TableView;
