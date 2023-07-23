import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, A11y } from 'swiper/modules';

import { BrandsCarouselItem } from './BrandsCarouselItem';
import { SwiperNavButtons } from './SwiperNavButtons';
import { data } from './constants';

import 'swiper/css';
import 'swiper/css/navigation';
import './styles.scss';

type PropsType = {};

export const BrandsCarousel: FC<PropsType> = () => {
  const slides = [...data, ...data, ...data, ...data];

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={24}
      centeredSlides
      loop
      mousewheel
      breakpoints={{
        0: {
          slidesPerView: 1.8,
          spaceBetween: 10,
        },
        550: {
          slidesPerView: 3.5,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        1700: {
          slidesPerView: 4.5,
          spaceBetween: 30,
        },
      }}
      modules={[Mousewheel, Navigation, A11y]}
      className="brands-carousel-swiper"
    >
      {slides.map((item, index) => (
        <SwiperSlide key={item.name + index}>
          <BrandsCarouselItem {...item} />
        </SwiperSlide>
      ))}
      <SwiperNavButtons />
    </Swiper>
  );
};
