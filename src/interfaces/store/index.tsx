export type LoadingState = {
  isCreating: boolean;
  isFecthingOne: boolean;
  isFetchingList: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
};

export type SliceState<Loading, Data> = {
  loading: Loading;
  data: Data;
};

export type OnThunkError = (error: Error | unknown) => void;
