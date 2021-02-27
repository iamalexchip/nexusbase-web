import React, { FC, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createRecord } from '../../../actions/records';
import IRootStore from '../../../types/store/root';
import Button from '../../atoms/Button/Button';

const NewRecordDropdown: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { collection, isCreating, isNew, record, } = useSelector(({
    collections: { collection },
    records: { isCreating, isNew, record },
  }: IRootStore) => ({ collection, isCreating, isNew, record }));

  useEffect(() => {
    if (isNew && record) {
      history.push({ search: `?r=${record.id}` });
    }
  }, [isNew, record, history]);

  if (!collection) {
    return <Button disabled={true}>New</Button>
  }

  return (
    <div>
      <Button
        disabled={isCreating}
        onClick={() => dispatch(createRecord(collection.id))}
      >New</Button>
    </div>
  )
}

export default NewRecordDropdown