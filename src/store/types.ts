export type GeneralState = {
  [key: string]: {
    data: Brand[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
  };
};

export type Brand = {
  id: number;
  created: string;
  updated: string;
  title: string;
  description: string;
  pictureUrl: string;
  active: boolean;
};

export type Response<T> = {
  data: T;
  status: number;
};
