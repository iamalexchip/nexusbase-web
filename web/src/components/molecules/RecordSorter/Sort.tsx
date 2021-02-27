import React from 'react';
import Button from '../../atoms/Button/Button';

const Sort = ({ index, sort, fieldOptions, directionOptions, updateSorts, deleteSort }: any) => {
  const selectedField = fieldOptions.find((option: any) => option.value === sort.field);
  const selectedDirection = directionOptions.find((option: any) => option.value === sort.direction);

  const update = (key: string, value: string) => {
    updateSorts(index, { ...sort, [key]: value });
  }
  
  return (
    <div style={{ display: 'flex', margin: '20px 0' }}>
      <div style={{ flex: 1, marginRight: '5px' }}>
        <select
          value={selectedField.value}
          onChange={(e: any) => update('field', e.target.value)}
        >
          {fieldOptions.map((option: any, index: number) =>
            <option
              key={index}
              value={option.value}
            >{option.label}</option>
          )}
        </select>
      </div>
      <div style={{ flex: 1, marginRight: '5px' }}>
        <select
          value={selectedDirection.value}
          onChange={(e: any) => update('direction', e.target.value)}
        >
          {directionOptions.map((option: any, index: number) =>
            <option
              key={index}
              value={option.value}
            >{option.label}</option>
          )}
        </select>
      </div>
      <Button onClick={() => deleteSort(index)}>X</Button>
    </div>
  )
}

export default Sort;
