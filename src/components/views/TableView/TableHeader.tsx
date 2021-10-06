import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { Collection } from '../../../interfaces/store/collections';
import { View } from '../../../interfaces/store/views';
import { addAttributeToCollection } from '../../../store/slices/collections';
import AttributeWidget from '../../AttributeWidget';

type Props = {
  collection: Collection;
  view: View;
};

const TableHeader: FC<Props> = ({ collection, view }) => {
  const dispatch = useAppDispatch();
  const [newColumnText, setNewColumnText] = useState<string>('');

  const handleAddColumn = () => {
    dispatch(addAttributeToCollection(collection.id, () => {}));
  };

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
        <td
          onMouseOver={() => setNewColumnText('Add attribute')}
          onMouseOut={() => setNewColumnText('')}
          onClick={handleAddColumn}
        >
          + {newColumnText}
        </td>
      </tr>
    </thead>
  );
};

export default TableHeader;
