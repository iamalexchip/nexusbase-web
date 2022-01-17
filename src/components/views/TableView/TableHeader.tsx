import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { Collection } from '../../../interfaces/store/collections';
import { View } from '../../../interfaces/store/views';
import {
  addAttributeToCollection,
  setEditAttribute,
} from '../../../store/slices/collections';

type Props = {
  collection: Collection;
  view: View;
};

const TableColumn: FC<{
  collection: Collection;
  attributeId: string;
  editAttribute: () => void;
}> = ({ collection, attributeId, editAttribute }) => {
  const attribute = collection.attributes.find(
    (attribute) => attribute.id === attributeId
  );
  if (!attribute) return <></>;

  return (
    <td className="cursor-pointer" onClick={editAttribute}>
      {attribute.label}
    </td>
  );
};

const TableHeader: FC<Props> = ({ collection, view }) => {
  const dispatch = useAppDispatch();
  const [newColumnText, setNewColumnText] = useState<string>('');

  const handleAddAttribute = () => {
    dispatch(addAttributeToCollection(collection.id, () => {}));
  };
  const handleEditAttribute = (attributeId: string) =>
    dispatch(setEditAttribute({ colId: collection.id, attrId: attributeId }));

  return (
    <thead>
      <tr>
        {view.attributes.map((attributeId, index) => (
          <TableColumn
            key={index}
            collection={collection}
            attributeId={attributeId}
            editAttribute={() => handleEditAttribute(attributeId)}
          />
        ))}
        <td
          onMouseOver={() => setNewColumnText('Add attribute')}
          onMouseOut={() => setNewColumnText('')}
          onClick={handleAddAttribute}
        >
          + {newColumnText}
        </td>
      </tr>
    </thead>
  );
};

export default TableHeader;
