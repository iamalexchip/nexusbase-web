import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { Collection } from '../../../interfaces/store/collections';
import { View } from '../../../interfaces/store/views';
import {
  addPropertyToCollection,
  setEditProperty,
} from '../../../store/slices/collections';

type Props = {
  collection: Collection;
  view: View;
};

const TableColumn: FC<{
  collection: Collection;
  propertyId: string;
  editProperty: () => void;
}> = ({ collection, propertyId, editProperty }) => {
  const property = collection.properties.find(
    (property) => property.id === propertyId
  );
  if (!property) return <></>;

  return (
    <td className="cursor-pointer" onClick={editProperty}>
      {property.label}
    </td>
  );
};

const TableHeader: FC<Props> = ({ collection, view }) => {
  const dispatch = useAppDispatch();
  const [newColumnText, setNewColumnText] = useState<string>('');

  const handleAddProperty = () => {
    dispatch(addPropertyToCollection(collection.id, () => {}));
  };
  const handleEditProperty = (propertyId: string) =>
    dispatch(setEditProperty({ colId: collection.id, propId: propertyId }));

  return (
    <thead>
      <tr>
        {view.properties.map((propertyId, index) => (
          <TableColumn
            key={index}
            collection={collection}
            propertyId={propertyId}
            editProperty={() => handleEditProperty(propertyId)}
          />
        ))}
        <td
          onMouseOver={() => setNewColumnText('Add property')}
          onMouseOut={() => setNewColumnText('')}
          onClick={handleAddProperty}
        >
          + {newColumnText}
        </td>
      </tr>
    </thead>
  );
};

export default TableHeader;
