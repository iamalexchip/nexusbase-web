import React, { FC, useState } from 'react';
import Button from '../../atoms/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import IRootStore from '../../../types/store/root';
import { updateView } from '../../../actions/views';

const RecordGroupDropdown: FC = () => {
  const dispatch = useDispatch();
  const { collection, view } = useSelector(({
    collections: { collection },
    views: { view }
  }: IRootStore) => ({ collection, view }));
  const [showGroupBy, setShowGroupBy] = useState(false);
  
  if (!collection || !view) {
    return <div>Loading RecordGroupDropdown....</div>
  }
  
  const style = {
    borderColor: 'black',
    fontWeight: 'bold'
  };
  
  const groupable = ['dropdown'];
  const fields = collection.fields.filter((field) => groupable.includes(field.type));
  const fieldOptions = fields.map((field) => ({value: field.id, label: field.label }));
  const updateGroupField = (field: string) => {
    let updatedView = { ...view };
    updatedView.options.groupBy = field === 'None' ? null : field;
    dispatch(updateView(updatedView));
    setShowGroupBy(false);
  };
  let selectedOption;

  if (view.options.groupBy) {
    selectedOption = fieldOptions.find((option) => option.value === view.options.groupBy);
  }

  return (
    <div className="record-group" style={{
      margin: '0px 10px 10px 0px',
      padding: '2.5px 5px'
    }}>
      <Button
        style={showGroupBy || selectedOption ? style : {}}
        onClick={() => setShowGroupBy(!showGroupBy)}
      >Group by: {selectedOption ? selectedOption.label : 'None'}</Button>
      {showGroupBy &&
        <div className="record-group-dropdown">
          <select
            defaultValue={view.options.groupBy}
            onChange={(e: any) => updateGroupField(e.target.value)}
          >
            <option value="None">None</option>
            {fieldOptions.map((option, index) =>
              <option
                key={index}
                value={option.value}
              >{option.label}</option>
            )}
          </select>
        </div>
      }
    </div>
  )
}

export default RecordGroupDropdown;
