export type StateKey = 'news' | 'brands';

export type StateItems<T> = {
  data: T[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};

export type GeneralState = {
  news: StateItems<News>;
  brands: StateItems<Brand>;
};

export type Brand = {
  id: number;
  created?: string;
  updated?: string;
  title: string;
  description?: string;
  pictureUrl: string;
  active?: boolean;
};

export type News = {
  id: number;
  created?: string;
  updated?: string;
  date: string;
  title?: string;
  description: string;
  pictureUrl: string;
};

export type Response<T> = {
  data: T;
  status: number;
};
