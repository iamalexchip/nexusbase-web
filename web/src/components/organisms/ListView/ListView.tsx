import React, { FC } from 'react';
import IRootStore from '../../../types/store/root';
import { ICollectionField, IViewModel } from '../../../types/database';
import { useSelector } from 'react-redux';
import ListGroups from './ListGroups';
import ListRows from './ListRows';
import FieldWidget from '../FieldWidget';
import { FaPlus } from 'react-icons/fa';

interface CIListView {
  view: IViewModel;
}

const ListView: FC<CIListView> = ({ view }) => {
  const { collection, records } = useSelector(({
    collections: { collection},
    records: { records }
  }: IRootStore) => ({ collection, records }));
  
  if (!collection) {
    return <p>Loading....</p>
  }

  const clFields = collection.fields;
  const viewFields: ICollectionField[] = [];
  
  for (const viewField of view.fields) {
    const field = clFields.find((clField: ICollectionField) => clField.id === viewField);

    if (field) {
      viewFields.push(field);
    }
  }
  
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {viewFields.map((viewField: ICollectionField, index: number) =>
            <th key={index}>
              <FieldWidget field={viewField} />
            </th>
          )}
          <th><FaPlus /></th>
        </tr>
      </thead>
      <tbody>
        {view.options.groupBy ?
          <ListGroups {...{ viewFields, records, by: view.options.groupBy }} />
        :
          <ListRows {...{ viewFields, records }} /> 
        }
      </tbody>
    </table>
  );
}

export default ListView;
