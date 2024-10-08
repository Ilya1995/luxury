import { FC } from 'react';
import { useSwiper } from 'swiper/react';

export const SwiperNavButtonNext: FC = () => {
  const swiper = useSwiper();

  return (
    <img
      className="news-card-mobile__slider-button"
      onClick={() => swiper.slideNext()}
      alt="next"
      src="/nav-next.svg"
    />
  );
};
