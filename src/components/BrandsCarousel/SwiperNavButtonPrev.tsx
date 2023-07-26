import { FC } from 'react';
import { useSwiper } from 'swiper/react';

import './styles.scss';

export const SwiperNavButtonPrev: FC = () => {
  const swiper = useSwiper();

  return (
    <img
      className="swiper-nav-button swiper-nav-button_prev"
      onClick={() => swiper.slidePrev()}
      alt="вперед"
      src="./nav-prev.svg"
    />
  );
};
