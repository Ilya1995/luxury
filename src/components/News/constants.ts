import dayjs from 'dayjs';
import { News } from '../../store/types';

export const data: News[] = [
  {
    id: 1,
    pictureUrl: './news0.svg',
    description: 'Luxury Living Soiree с Татьяной Поляковой',
    date: dayjs().toISOString(),
  },
  {
    id: 2,
    pictureUrl: './news1.svg',
    description: 'Разнообразие коллекций HERMES в нашем салоне',
    date: dayjs().toISOString(),
  },
  {
    id: 3,
    pictureUrl: './news2.svg',
    description: 'Новогодние скидки на Fendi Casa и Ritz Paris',
    date: dayjs().toISOString(),
  },
  {
    id: 4,
    pictureUrl: './news3.svg',
    description: 'Christmas Selection with Baccarat',
    date: dayjs().toISOString(),
  },
  {
    id: 5,
    pictureUrl: './news4.svg',
    description: 'Новая коллекция Versace Home',
    date: dayjs().toISOString(),
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
