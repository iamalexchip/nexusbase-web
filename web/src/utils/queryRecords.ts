import { IRecordModel } from "../types/database";
import { IRecordsQuery } from "../types/store/records";
import * as lodash from 'lodash';

interface IqueryRecords {
  records: IRecordModel[];
  query: IRecordsQuery;
}

const queryRecords = ({ records: allRecords, query }: IqueryRecords) => {
  const { sorts } = query;
  let records = lodash.chain(allRecords);

  if (sorts.length > 0) {
    const sortFields = sorts.map((sort: any) => `fields.${sort.field}`);
    const sortDirections = sorts.map((sort: any) => sort.direction);
    records = records.orderBy(sortFields, sortDirections);
  }

  return records.value();
}

export default queryRecords
