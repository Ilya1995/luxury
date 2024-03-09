import dayjs from 'dayjs';
import { News } from '../../store/types';

export const data: News[] = [
  {
    id: 1,
    title: 'Luxury Living Soiree с Татьяной Поляковой',
    description: 'Luxury Living Soiree с Татьяной Поляковой',
    descriptionRus: 'Luxury Living Soiree с Татьяной Поляковой',
    date: dayjs().toISOString(),
    newsDate: dayjs().toISOString(),
    imageId: 1,
  },
  {
    id: 2,
    title: 'Разнообразие коллекций HERMES в нашем салоне',
    description: 'Разнообразие коллекций HERMES в нашем салоне',
    descriptionRus: 'Разнообразие коллекций HERMES в нашем салоне',
    date: dayjs().toISOString(),
    newsDate: dayjs().toISOString(),
    imageId: 2,
  },
  {
    id: 3,
    title: 'Новогодние скидки на Fendi Casa и Ritz Paris',
    description: 'Новогодние скидки на Fendi Casa и Ritz Paris',
    descriptionRus: 'Новогодние скидки на Fendi Casa и Ritz Paris',
    date: dayjs().toISOString(),
    newsDate: dayjs().toISOString(),
    imageId: 3,
  },
  {
    id: 4,
    title: 'Christmas Selection with Baccarat',
    description: 'Christmas Selection with Baccarat',
    descriptionRus: 'Christmas Selection with Baccarat',
    date: dayjs().toISOString(),
    newsDate: dayjs().toISOString(),
    imageId: 4,
  },
  {
    id: 5,
    title: 'Новая коллекция Versace Home',
    description: 'Новая коллекция Versace Home',
    descriptionRus: 'Новая коллекция Versace Home',
    date: dayjs().toISOString(),
    newsDate: dayjs().toISOString(),
    imageId: 5,
  },
];

export const breakpoints = {
  0: {
    slidesPerView: 1.9,
    spaceBetween: 8,
  },
  400: {
    slidesPerView: 2.1,
    spaceBetween: 8,
  },
  500: {
    slidesPerView: 2.5,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 5,
    spaceBetween: 24,
  },
};
