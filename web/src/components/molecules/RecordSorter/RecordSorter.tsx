import React, { FC } from 'react';
import Button from '../../atoms/Button';
import Card from '../../atoms/Card';
import Sort from './Sort';
import { useSelector, useDispatch } from 'react-redux';
import IRootStore from '../../../types/store/root';
import { setRecords, setSorting } from '../../../actions/records';

const RecordSorter: FC = () => {
  const dispatch = useDispatch();
  const { collection, query, isSorting } = useSelector(({
    collections: { collection },
    views: { view },
    records: { query, isSorting }
  }: IRootStore) => ({ collection, query, isSorting }));
  const { sorts } = query;
  const style = {
    borderColor: 'black',
    fontWeight: 'bold'
  };

  if (!collection) {
    return <div>Loading...</div>
  }

  const fieldOptions = collection.fields.map((field: any) => {
    return { value: field.id, label: field.label };
  });
  const directionOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ];

  const addSort = () => {
    let updatedSorts = [ ...sorts ];
    updatedSorts.push({
      field: collection.fields[0].id,
      direction: 'asc'
    });
    
    updateRecords(updatedSorts);
  }

  const updateSorts = (index: number, data: any) => {
    let updatedSorts = [ ...sorts ];
    updatedSorts[index] = data;

    updateRecords(updatedSorts);
  }

  const deleteSort = (index: number) => {
    let updatedSorts = [ ...sorts ];
    updatedSorts.splice(index, 1);

    updateRecords(updatedSorts);
  }
  
  const updateRecords = (updatedSorts: any) => {
    dispatch(setRecords({ ...query, sorts: updatedSorts }));
  }

  return (
    <div className="record-sorts" style={{
      margin: '0px 10px 10px 0px',
      padding: '2.5px 5px'
    }}>
      <Button
        style={isSorting || sorts.length > 0 ? style : {}}
        onClick={() => dispatch(setSorting(!isSorting))}
      >Sort</Button>
      {isSorting &&
        <div className="record-sorts-dropdown">
          <Card
            header={() => <div>Sort</div>}
          >
            {sorts.map((sort: any, index: number) =>
              <Sort
                key={index}
                {...{
                  index,
                  sort,
                  fieldOptions,
                  directionOptions,
                  updateSorts,
                  deleteSort,
                }}
              />
            )}
            <Button onClick={addSort}>Add a sort</Button>
          </Card>
        </div>
      }
    </div>
  )
}

export default RecordSorter;
