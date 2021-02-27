import { IRecordModel } from '../database';

export interface IRecordsSort {
  field: string;
  direction: 'asc' | 'desc';
}

export interface IRecordsFilter {
  field: string;
  comparison: string;
  value: string;
}

export interface IRecordsQuery {
  sorts: IRecordsSort[];
}

export default interface IRecordsState {
  isFetchingOne: boolean;
  isFetchingList: boolean;
  isFetchingTempRecords: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  recordsSynced: boolean;
  recordSynced: boolean;
  isNew: boolean;
  isSorting: boolean;
  isSettingRecords: boolean
  records: IRecordModel[];
  allRecords: IRecordModel[];
  tempRecords: IRecordModel[];
  record: null | IRecordModel;
  relatedToRecords: IRecordModel[],
  relatedToRecord: IRecordModel[],
  query: IRecordsQuery;
}

export enum IRecordActionTypes {
  CREATE_RECORD_START = 'CREATE_RECORD_START',
  CREATE_RECORD_SUCCESS = 'CREATE_RECORD_SUCCESS',
  GET_RECORDS_START = 'GET_RECORDS_START',
  GET_RECORDS_SUCCESS = 'GET_RECORDS_SUCCESS',
  GET_TEMP_RECORDS_START = 'GET_TEMP_RECORDS_START',
  GET_TEMP_RECORDS_SUCCESS = 'GET_TEMP_RECORDS_SUCCESS',
  GET_RECORD_START = 'GET_RECORD_START',
  GET_RECORD_SUCCESS = 'GET_RECORD_SUCCESS',
  UPDATE_RECORD_START = 'UPDATE_RECORD_START',
  UPDATE_RECORD_SUCCESS = 'UPDATE_RECORD_SUCCESS',
  DELETE_RECORD_START = 'DELETE_RECORD_START',
  DELETE_RECORD_SUCCESS = 'DELETE_RECORD_SUCCESS',
  CLEAR_RECORDS = 'CLEAR_RECORDS',
  CLEAR_TEMP_RECORDS = 'CLEAR_TEMP_RECORDS',
  CLEAR_RECORD = 'CLEAR_RECORD',
  SET_RECORDS_START = 'SET_RECORDS_START',
  SET_RECORDS_SUCCESS = 'SET_RECORDS_SUCCESS',
  SET_RECORD_SYNC = 'SET_RECORD_SYNC',
  SET_SORTING = 'SET_SORTING',
}

export interface CreateRecordStart {
  type: IRecordActionTypes.CREATE_RECORD_START;
}

export interface CreateRecordSuccess {
  type: IRecordActionTypes.CREATE_RECORD_SUCCESS;
  payload: {
    record: IRecordModel;
  }
}

export interface GetRecordsStart {
  type: IRecordActionTypes.GET_RECORDS_START
}

export interface GetRecordsSuccess {
  type: IRecordActionTypes.GET_RECORDS_SUCCESS;
  payload: {
    allRecords: IRecordModel[];
    records: IRecordModel[];
    relatedToRecords: IRecordModel[];
  }
}

export interface GetTempRecordsStart {
  type: IRecordActionTypes.GET_TEMP_RECORDS_START
}

export interface GetTempRecordsSuccess {
  type: IRecordActionTypes.GET_TEMP_RECORDS_SUCCESS;
  payload: {
    tempRecords: IRecordModel[];
  }
}

export interface GetRecordStart {
  type: IRecordActionTypes.GET_RECORD_START
}

export interface GetRecordSuccess {
  type: IRecordActionTypes.GET_RECORD_SUCCESS;
  payload: {
    record: IRecordModel;
  }
}

export interface UpdateRecordStart {
  type: IRecordActionTypes.UPDATE_RECORD_START;
}

export interface UpdateRecordSuccess {
  type: IRecordActionTypes.UPDATE_RECORD_SUCCESS;
}

export interface DeleteRecordStart {
  type: IRecordActionTypes.DELETE_RECORD_START;
}

export interface DeleteRecordSuccess {
  type: IRecordActionTypes.DELETE_RECORD_SUCCESS;
}

export interface ClearRecords {
  type: IRecordActionTypes.CLEAR_RECORDS;
}

export interface ClearTempRecords {
  type: IRecordActionTypes.CLEAR_TEMP_RECORDS;
}

export interface ClearRecord {
  type: IRecordActionTypes.CLEAR_RECORD;
}

export interface SetRecordsStart {
  type: IRecordActionTypes.SET_RECORDS_START;
}

export interface SetRecordsSuccess {
  type: IRecordActionTypes.SET_RECORDS_SUCCESS;
  payload: {
    query: IRecordsQuery;
    records: IRecordModel[];
  }
}

export interface SetSorting {
  type: IRecordActionTypes.SET_SORTING;
  payload: {
    isSorting: boolean;
  }
}

export interface SetRecordSync {
  type: IRecordActionTypes.SET_RECORD_SYNC;
  payload: {
    recordSynced: boolean;
  }
}

export type IRecordsAction =
  | CreateRecordStart
  | CreateRecordSuccess
  | GetRecordsStart
  | GetRecordsSuccess
  | GetTempRecordsStart
  | GetTempRecordsSuccess
  | GetRecordStart
  | GetRecordSuccess
  | UpdateRecordStart
  | UpdateRecordSuccess
  | DeleteRecordStart
  | DeleteRecordSuccess
  | ClearRecords
  | ClearTempRecords
  | ClearRecord
  | SetRecordSync
  | SetSorting
  | SetRecordsStart
  | SetRecordsSuccess;
