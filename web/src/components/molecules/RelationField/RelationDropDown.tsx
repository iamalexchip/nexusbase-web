import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTempRecords, clearTempRecords } from '../../../actions/records';
import IRootStore from '../../../types/store/root';
import Select from 'react-select';
import { IDropDownFieldChoice } from '../../../types/database';

const RelationDropDown = (props: any) => {
  const {
    collection,
    reffField,
    data,
    style,
    onFocus,
    onBlur,
    onChange
  } = props;
  
  const dispatch = useDispatch();
  const { isFetchingTempRecords, tempRecords, relatedToRecords } = useSelector(({
    records: { isFetchingTempRecords, tempRecords, relatedToRecords },
  }: IRootStore) => ({ isFetchingTempRecords, tempRecords, relatedToRecords }));

  const [tempRecordsFetched, setTempRecordsFetched] = useState(false);
  let options: IDropDownFieldChoice[] = [];
  let initialOptions: IDropDownFieldChoice[] = [];
  const selected = data || [];
  
  if (tempRecordsFetched) {
    options = tempRecords.map((record) => ({ value: record.id, label: record.fields[reffField] }));
    initialOptions = options.filter((option: IDropDownFieldChoice) => {
      return selected.find((id: string) => id === option.value);
    });
  } else {
    const recordOptions = relatedToRecords.filter((record) => selected.find((id: string) => record.id === id));
    initialOptions = recordOptions.map((record) => ({ value: record.id, label: record.fields[reffField] }));
  }

  const onFocusHandler = () => {
    onFocus();
    setTempRecordsFetched(true);
    dispatch(getTempRecords(collection.id));
  }

  useEffect(() => {
    return () => {
      dispatch(clearTempRecords());
    }
  }, [dispatch]);
  
  return (
    <div style={style}>
      <Select
        isMulti
        isLoading={isFetchingTempRecords}
        value={initialOptions}
        options={options}
        onChange={onChange}
        onFocus={onFocusHandler}
        onBlur={onBlur}
      />
    </div>
  );
}

export default RelationDropDown;
