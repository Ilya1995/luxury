export type StateKey = 'news' | 'brands' | 'faqs';

export type StateItems<T> = {
  data: T[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};

export type Lang = 'RUS' | 'ENG';

export type GeneralState = {
  news: StateItems<News>;
  brands: StateItems<Brand>;
  faqs: StateItems<Faq>;
  searchText: string;
};

export type Brand = {
  id: number;
  created?: string;
  updated?: string;
  title: string;
  description?: string;
  active?: boolean;
  imageId: number;
};

export type News = {
  id: number;
  created?: string;
  updated?: string;
  date: string;
  newsDate: string;
  title: string;
  description?: string;
  imageId: number;
};

export type Faq = {
  id: number;
  created?: string;
  updated?: string;
  title: string;
  description: string;
  lang: Lang;
  active: boolean;
};

export type Response<T> = {
  data: {
    content: T;
  };
  status: number;
};
