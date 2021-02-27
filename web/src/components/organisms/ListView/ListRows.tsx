import { IRecordModel } from "../../../types/database";
import React, { FC } from "react";
import FieldFactory from "../FieldFactory";
import { useHistory } from "react-router-dom";

export interface CIListRows {
  viewFields: any[];
  records: IRecordModel[];
  startRowCount?: number;
}

const ListRows: FC<CIListRows> = ({ viewFields, records, startRowCount = 1 }) => {
  const history = useHistory();
  const rowClicked = (recordId: string) => history.push({ search: `?r=${recordId}` });
  
  return (
    <>
      {records.map((record, index) =>
        <tr key={index} onClick={() => rowClicked(record.id)}>
          <td>{startRowCount + index}</td>
          {viewFields.map((viewfield, index) =>
            <td key={index}>
              <FieldFactory
                field={viewfield}
                record={record}
              />
            </td>
          )}
        </tr>
      )}
    </>
  )
};

export default ListRows;
