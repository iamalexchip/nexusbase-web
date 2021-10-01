export type SliceState<T> = {
  loading: boolean;
  data: T;
};

export type OnThunkError = (error: Error | unknown) => void;
