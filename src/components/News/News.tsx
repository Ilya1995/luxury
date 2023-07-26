import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation } from 'swiper/modules';

import { SwiperNavButtonPrev } from '../SwiperNavButtonPrev';
import { SwiperNavButtonNext } from '../SwiperNavButtonNext';
import { Card } from './Card';
import { data, breakpoints } from './constants';

import 'swiper/css';
import 'swiper/css/navigation';
import './styles.scss';

type PropsType = {};

export const News: FC<PropsType> = () => {
  return (
    <div className="news">
      <div className="news__header">Новости</div>
      <div className="news__content">
        <Swiper
          slidesPerView={4.5}
          spaceBetween={24}
          speed={800}
          mousewheel
          breakpoints={breakpoints}
          modules={[Mousewheel, Navigation]}
          className="news-swiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Card {...item} />
            </SwiperSlide>
          ))}
          <SwiperNavButtonPrev />
          <SwiperNavButtonNext />
        </Swiper>
      </div>
    </div>
  );
};
