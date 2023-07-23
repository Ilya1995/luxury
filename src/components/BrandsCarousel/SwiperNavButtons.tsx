import { FC } from 'react';
import { useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import './styles.scss';

type PropsType = {};

export const SwiperNavButtons: FC<PropsType> = () => {
  const swiper = useSwiper();

  const slidePrev = () => {
    swiper.slidePrev();
  };
  const slideNext = () => {
    swiper.slideNext();
  };

  return (
    <div className="swiper-nav-buttons">
      <img
        className="swiper-nav-buttons__prev"
        onClick={slidePrev}
        alt="назад"
        src="./nav-prev.svg"
      />
      <img
        className="swiper-nav-buttons__prev"
        onClick={slideNext}
        alt="вперед"
        src="./nav-next.svg"
      />
    </div>
  );
};
