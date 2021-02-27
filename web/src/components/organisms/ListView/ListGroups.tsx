import React, { FC } from "react";
import _ from "lodash";
import { IRecordModel, IDropDownField } from "../../../types/database";
import ListRows, { CIListRows } from "./ListRows";

interface IRecordsGroup {
  [key: string]: IRecordModel[];
}

interface CIListGroups extends CIListRows {
  by: string;
}

const ListGroups: FC<CIListGroups> = ({ viewFields, records, by }) => {
  let rawGroups = _.groupBy(records, `fields.${by}`);
  delete rawGroups.null;
  delete rawGroups.undefined;

  const field: IDropDownField = viewFields.find((viewField) => viewField.id === by);
  const groupWithValueEmpty = records.filter((record) => record.fields[field.id] === "" || !record.fields[field.id]);
  const emptyChoice = {
    value: 'empty',
    label: `No ${field.label}`
  };
  const hasEmpty: boolean = groupWithValueEmpty.length > 0;
  const choices = hasEmpty ? [ emptyChoice, ...field.options.choices ] : field.options.choices;
  const groups = hasEmpty ? { empty: groupWithValueEmpty, ...rawGroups } : rawGroups;
  let rowGroups = [];
  let rowCount = 1;

  for (const choice of choices) {
    const records = groups[choice.value];

    if (!records) continue;
    
    rowGroups.push({
      startCount: rowCount,
      RowGroup: ({ startRowCount }:{ startRowCount: number }) => (
        <>
          <tr className="no-hover">
            <td colSpan={viewFields.length + 1}>({field.label}): {choice.label}</td>
          </tr>
          <ListRows {...{ viewFields, records, startRowCount }} />
        </>
      )
    });

    rowCount += records.length;
  }
  
  return (
    <>
      {rowGroups.map(({ startCount, RowGroup }: any, index) =>
        <RowGroup key={index} startRowCount={startCount} />
      )}
    </>
  )
};

export default ListGroups;