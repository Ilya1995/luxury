import { FC } from 'react';
import { useSwiper } from 'swiper/react';

import './styles.scss';

export const SwiperNavButtonNext: FC = () => {
  const swiper = useSwiper();

  return (
    <img
      className="swiper-nav-button swiper-nav-button_next"
      onClick={() => swiper.slideNext()}
      alt="вперед"
      src="./nav-next.svg"
    />
  );
};
