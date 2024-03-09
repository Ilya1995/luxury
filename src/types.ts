import { Brand } from './store/types';

export type TabType = {
  label: string;
  path: string;
};

export type Product = {
  id: number;
  src: string;
  brand: Brand | null;
  name: string;
  description: string;
  country: string;
  photos: string[];
  imageId: number | null;
  title: string;
  materials: string | null;
  volume?: string;
};
