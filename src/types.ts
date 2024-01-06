export type TabType = {
  label: string;
  path: string;
};

export type Product = {
  id: number;
  src: string;
  brand: string;
  name: string;
  material: string;
  description: string;
  country: string;
  photos: string[];
  volume?: string;
};
