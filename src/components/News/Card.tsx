import { FC } from 'react';
import { useSwiperSlide } from 'swiper/react';
import classNames from 'classnames';

import { useMedia } from '../../hooks';

import './styles.scss';

type PropsType = {
  id: number;
  src: string;
  title: string;
  date: string;
};

export const Card: FC<PropsType> = ({ src, title }) => {
  const swiperSlide = useSwiperSlide();
  const isMobile = useMedia('(max-width: 550px)');

  const isVisible = isMobile
    ? swiperSlide.isActive
    : Object.values(swiperSlide).some(Boolean);

  return (
    <div
      className={classNames('card', {
        card_visited: isVisible,
      })}
    >
      <img className="card__img" alt="news" src={src} />
      <div className="card__name">{title}</div>
    </div>
  );
};
