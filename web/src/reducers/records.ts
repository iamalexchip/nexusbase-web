import IRecordsState, {
  IRecordsAction,
  IRecordActionTypes as types
} from '../types/store/records';

export const initialState: IRecordsState = {
  isFetchingOne: false,
  isFetchingList: false,
  isFetchingTempRecords: false,
  isCreating: false,
  isUpdating: false,
  recordsSynced: true,
  recordSynced: true,
  isNew: false,
  isSorting: false,
  isSettingRecords: false,
  records: [],
  allRecords: [],
  tempRecords: [],
  record: null,
  relatedToRecords: [],
  relatedToRecord: [],
  query: {
    sorts: []
  },
};
  
export default (
  state = initialState, action: IRecordsAction
): IRecordsState => {
  switch (action.type) {
    case types.CREATE_RECORD_START: {
      return {
        ...state,
        isCreating: true
      };
    }
    case types.CREATE_RECORD_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isCreating: false,
        isNew: true,
        recordsSynced: false
      };
    }

    case types.GET_RECORDS_START: {
      return {
        ...state,
        isFetchingList: true,
        isSettingRecords: true
      };
    }
    case types.GET_RECORDS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        recordsSynced: true,
        isFetchingList: false,
        isSettingRecords: false
      };
    }

    case types.GET_TEMP_RECORDS_START: {
      return {
        ...state,
        isFetchingTempRecords: true
      };
    }
    case types.GET_TEMP_RECORDS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingTempRecords: false
      };
    }

    case types.GET_RECORD_START: {
      return {
        ...state,
        isFetchingOne: true
      };
    }
    case types.GET_RECORD_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingOne: false,
        recordSynced: true,
        isNew: false
      };
    }

    case types.UPDATE_RECORD_START: {
      return {
        ...state,
        isUpdating: true
      };
    }
    case types.UPDATE_RECORD_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
        recordsSynced: false,
        recordSynced: false
      };
    }

    case types.DELETE_RECORD_START: {
      return {
        ...state,
        isUpdating: true
      };
    }
    case types.DELETE_RECORD_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
        recordsSynced: false,
        recordSynced: false
      };
    }

    case types.CLEAR_RECORDS: {
      return {
        ...state,
        records: [],
        relatedToRecords: [],
        isSorting: false
      };
    }

    case types.CLEAR_TEMP_RECORDS: {
      return {
        ...state,
        tempRecords: []
      };
    }
    
    case types.CLEAR_RECORD: {
      return {
        ...state,
        record: null,
        relatedToRecord: [],
        isNew: false
      };
    }

    case types.SET_RECORD_SYNC: {
      return {
        ...state,
        ...action.payload
      };
    }

    case types.SET_RECORDS_START: {
      return {
        ...state,
        isSettingRecords: true
      };
    }

    case types.SET_RECORDS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isSettingRecords: false
      };
    }

    case types.SET_SORTING: {
      return {
        ...state,
        ...action.payload
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};