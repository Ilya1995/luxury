import dayjs from 'dayjs';
import { News } from '../../store/types';

export const data: News[] = [
  {
    id: 1,
    pictureUrl: './news0.svg',
    title: 'Luxury Living Soiree с Татьяной Поляковой',
    description: 'Luxury Living Soiree с Татьяной Поляковой',
    date: dayjs().toISOString(),
    imageId: 1,
  },
  {
    id: 2,
    pictureUrl: './news1.svg',
    title: 'Разнообразие коллекций HERMES в нашем салоне',
    description: 'Разнообразие коллекций HERMES в нашем салоне',
    date: dayjs().toISOString(),
    imageId: 2,
  },
  {
    id: 3,
    pictureUrl: './news2.svg',
    title: 'Новогодние скидки на Fendi Casa и Ritz Paris',
    description: 'Новогодние скидки на Fendi Casa и Ritz Paris',
    date: dayjs().toISOString(),
    imageId: 3,
  },
  {
    id: 4,
    pictureUrl: './news3.svg',
    title: 'Christmas Selection with Baccarat',
    description: 'Christmas Selection with Baccarat',
    date: dayjs().toISOString(),
    imageId: 4,
  },
  {
    id: 5,
    pictureUrl: './news4.svg',
    title: 'Новая коллекция Versace Home',
    description: 'Новая коллекция Versace Home',
    date: dayjs().toISOString(),
    imageId: 5,
  },
];

export const breakpoints = {
  0: {
    slidesPerView: 2.1,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 5,
    spaceBetween: 24,
  },
};
