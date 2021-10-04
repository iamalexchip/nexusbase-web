import React, { FC } from 'react';
import { Collection } from '../../../interfaces/store/collections';
import { View } from '../../../interfaces/store/views';
import AttributeWidget from '../../AttributeWidget';

type Props = {
  collection: Collection;
  view: View;
};

const TableHeader: FC<Props> = ({ collection, view }) => {
  const TableColumn: FC<{ id: string }> = ({ id }) => {
    const attribute = collection.attributes.find(
      (attribute) => attribute.id === id
    );
    if (!attribute) return <></>;

    return (
      <td>
        <AttributeWidget data={attribute} />
      </td>
    );
  };

  return (
    <thead>
      <tr>
        {view.attributes.map((attributeId, index) => (
          <TableColumn key={index} id={attributeId} />
        ))}
        <td>+</td>
      </tr>
    </thead>
  );
};

export default TableHeader;
