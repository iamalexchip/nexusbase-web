import React, { FC, useState } from "react";
import FieldFactory from "../FieldFactory";
import FieldWidget from "../FieldWidget";

interface CIRecordField {
  field: any;
  record: any;
  update: any;
}

const RecordField: FC<CIRecordField> = ({ field, record, update }) => {
  const [focus, setFocus] = useState(false);
  
  return (
    <div className="record-field">
      <FieldWidget
        field={field}
        style={{
          marginTop: '20px',
          marginBottom: '10px',
          color: focus ? '#11f' : 'initial'
        }}
      />
      <FieldFactory
        edit
        field={field}
        record={record}
        style={{ width: '60%', marginBottom: '25px' }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        update={update}
      />
    </div>
  )
};

export default RecordField;
