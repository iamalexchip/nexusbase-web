import { Dispatch } from 'redux';
import {
  IRecordActionTypes as types,
  CreateRecordStart,
  CreateRecordSuccess,
  GetRecordsStart,
  GetRecordsSuccess,
  GetRecordStart,
  GetRecordSuccess,
  ClearRecords,
  ClearTempRecords,
  ClearRecord,
  IRecordsQuery,
  SetSorting,
  UpdateRecordStart,
  UpdateRecordSuccess,
  GetTempRecordsStart,
  GetTempRecordsSuccess,
  DeleteRecordStart,
  DeleteRecordSuccess,
  SetRecordSync,
  SetRecordsStart,
  SetRecordsSuccess,
} from '../types/store/records';
import IRootStore from '../types/store/root';
import { IRecordModel } from '../types/database';
import queryRecords from '../utils/queryRecords';

const { ipcRenderer } = window.require("electron");

export const createRecord = (collectionId: string) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const createRecordStart: CreateRecordStart = {
      type: types.CREATE_RECORD_START
    };

    dispatch(createRecordStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      record: {
        action: 'createRecord',
        args: {
          collectionId
        }
      }
    });
    
    if (response?.errors?.record) {
      console.log({ recordError: response.errors.record });
      return;
    }

    const createRecordSuccess: CreateRecordSuccess = {
      type: types.CREATE_RECORD_SUCCESS,
      payload: {
        record: response.data.record
      }
    };
    
    dispatch(createRecordSuccess);
  }
}

export const getRecords = (collectionId: string) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const getRecordsStart: GetRecordsStart = {
      type: types.GET_RECORDS_START
    };
    
    dispatch(getRecordsStart);

    const response = ipcRenderer.sendSync('nbql', {
      records: {
        action: 'getRecords',
        args: {
          collectionId,
          related: true
        }
      }
    });

    if (response?.errors?.records) {
      console.log({ recordsError: response.errors.records });
      return;
    }

    const { items: allRecords, related: relatedToRecords } = response.data.records;
    const records = queryRecords({
      records: allRecords,
      query: getState().records.query
    });

    const getRecordsSuccess: GetRecordsSuccess = {
      type: types.GET_RECORDS_SUCCESS,
      payload: { allRecords, records, relatedToRecords }
    };
    
    dispatch(getRecordsSuccess);
  }
}

export const getTempRecords = (collectionId: string) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const getTempRecordsStart: GetTempRecordsStart = {
      type: types.GET_TEMP_RECORDS_START
    };
    
    dispatch(getTempRecordsStart);

    const response = ipcRenderer.sendSync('nbql', {
      records: {
        action: 'getRecords',
        args: {
          collectionId,
          related: false
        }
      }
    });

    if (response?.errors?.records) {
      console.log({ recordsError: response.errors.records });
      return;
    }

    const { items: tempRecords } = response.data.records;
    const getTempRecordsSuccess: GetTempRecordsSuccess = {
      type: types.GET_TEMP_RECORDS_SUCCESS,
      payload: { tempRecords }
    };
    
    dispatch(getTempRecordsSuccess);
  }
}

export const setRecords = (submitedQuery?: IRecordsQuery) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const setRecordsStart: SetRecordsStart = {
      type: types.SET_RECORDS_START
    };

    dispatch(setRecordsStart);

    const { query: currentQuery, allRecords } = getState().records;
    const query = (submitedQuery === undefined) ? currentQuery : submitedQuery;
    const records = queryRecords({
      query,
      records: allRecords
    });

    const setRecordsSucess: SetRecordsSuccess = {
      type: types.SET_RECORDS_SUCCESS,
      payload: { records, query }
    };

    dispatch(setRecordsSucess);
  }
}

export const getRecord = (id: string) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const getRecordStart: GetRecordStart = {
      type: types.GET_RECORD_START
    };
    
    dispatch(getRecordStart);

    const records = getState().records.records
    const record = records.find(record => record.id === id);

    if (record) {
      const getRecordSuccess: GetRecordSuccess = {
        type: types.GET_RECORD_SUCCESS,
        payload: { record }
      };
      
      dispatch(getRecordSuccess);
    }
  }
}

export const updateRecord = (record: IRecordModel) => {
  return (dispatch: Dispatch) => {
    const updateRecordStart: UpdateRecordStart = {
      type: types.UPDATE_RECORD_START
    };

    dispatch(updateRecordStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      record: {
        action: 'updateRecord',
        args: record
      }
    });
    
    if (response?.errors?.record) {
      console.log({ recordError: response.errors.record });
      return;
    }

    const updateRecordSuccess: UpdateRecordSuccess = {
      type: types.UPDATE_RECORD_SUCCESS
    };
    
    dispatch(updateRecordSuccess);
  }
}

export const deleteRecord = (id: string) => {
  return (dispatch: Dispatch) => {
    const deleteRecordStart: DeleteRecordStart = {
      type: types.DELETE_RECORD_START
    };

    dispatch(deleteRecordStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      record: {
        action: 'deleteRecord',
        args: { id }
      }
    });
    
    if (response?.errors?.record) {
      console.log({ recordError: response.errors.record });
      return;
    }

    const deleteRecordSuccess: DeleteRecordSuccess = {
      type: types.DELETE_RECORD_SUCCESS
    };
       
    dispatch(deleteRecordSuccess);
  }
}

export const clearRecords = () => {
  return (dispatch: Dispatch) => {
    const clearRecords: ClearRecords = {
      type: types.CLEAR_RECORDS,
    };
    
    dispatch(clearRecords);
  }
}

export const clearTempRecords = () => {
  return (dispatch: Dispatch) => {
    const clearTempRecords: ClearTempRecords = {
      type: types.CLEAR_TEMP_RECORDS,
    };
    
    dispatch(clearTempRecords);
  }
}

export const clearRecord = () => {
  return (dispatch: Dispatch) => {
    const actionClearRecord: ClearRecord = {
      type: types.CLEAR_RECORD,
    };
    
    dispatch(actionClearRecord);
  }
}

export const setRecordSynced = (synced: boolean) => {
  return (dispatch: Dispatch) => {
    const setRecordSync: SetRecordSync = {
      type: types.SET_RECORD_SYNC,
      payload: {
        recordSynced: synced
      }
    };console.log('recod sync')
    
    dispatch(setRecordSync);
  }
}

export const setSorting = (isSorting: boolean) => {
  return (dispatch: Dispatch) => {
    const actionSetSorting: SetSorting = {
      type: types.SET_SORTING,
      payload: { isSorting }
    };
    
    dispatch(actionSetSorting);
  }
}
