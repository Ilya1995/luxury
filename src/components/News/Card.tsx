import { FC } from 'react';
import { useSwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { ButtonMore } from '../../components/ButtonMore';
import { useMedia } from '../../hooks';

import './styles.scss';

type PropsType = {
  id: number;
  src: string;
  description: string;
  date: string;
};

export const Card: FC<PropsType> = ({ src, description, date }) => {
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
      <div className="card__content">
        <div>
          <div className="card__content-date">
            {dayjs(date).format('D MMMM YYYY')}
          </div>
          <div className="card__content-title">{description}</div>
        </div>
        <ButtonMore />
      </div>
    </div>
  );
};
