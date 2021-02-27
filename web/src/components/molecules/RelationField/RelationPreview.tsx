import React, { FC } from 'react';
import FieldFactory from '../../organisms/FieldFactory';
import Label from '../../atoms/Label';
import { IRelationField } from '../../../types/database';
import { useSelector } from 'react-redux';
import IRootStore from '../../../types/store/root';

interface CIRelationPreview {
  field: IRelationField;
  recordIds: string[];
}

const RelationPreview: FC<CIRelationPreview> = ({ field, recordIds }) => {
  const relatedToRecords = useSelector((store: IRootStore) => store.records.relatedToRecords);
  const records = relatedToRecords.filter((record) => recordIds.includes(record.id));

  return (
    <div style={{ display: 'flex' }}>
      {records.map((record:any, index:number) =>
        <Label key={index}>
          <FieldFactory
            field={field}
            record={record}
          />
        </Label>
      )}
    </div>
  )
};

export default RelationPreview;
