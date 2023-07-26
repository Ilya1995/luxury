import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, Autoplay } from 'swiper/modules';

import { BrandsCarouselItem } from './BrandsCarouselItem';
import { SwiperNavButtonNext } from './SwiperNavButtonNext';
import { SwiperNavButtonPrev } from './SwiperNavButtonPrev';
import { data, breakpoints } from './constants';

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
      speed={800}
      loop
      mousewheel
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={breakpoints}
      modules={[Mousewheel, Navigation, Autoplay]}
      className="brands-carousel-swiper"
    >
      {slides.map((item, index) => (
        <SwiperSlide key={item.name + index}>
          <BrandsCarouselItem {...item} />
        </SwiperSlide>
      ))}
      <SwiperNavButtonPrev />
      <SwiperNavButtonNext />
    </Swiper>
  );
};
