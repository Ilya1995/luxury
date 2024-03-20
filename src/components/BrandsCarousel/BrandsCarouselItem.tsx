import { FC } from 'react';
import { useSwiperSlide } from 'swiper/react';
import classNames from 'classnames';

import { useMedia } from '../../hooks';

import './styles.scss';
import { baseURL } from '../..';

type PropsType = {
  imageId: number;
  title: string;
};

export const BrandsCarouselItem: FC<PropsType> = ({ imageId, title }) => {
  const swiperSlide = useSwiperSlide();
  const isMobile = useMedia('(max-width: 550px)');

  const isVisible = isMobile
    ? swiperSlide.isActive
    : Object.values(swiperSlide).some(Boolean);

  return (
    <div
      className={classNames('brands-carousel-item', {
        'brands-carousel-item_visited': isVisible,
      })}
    >
      {imageId && (
        <img
          className="brands-carousel-item__img"
          alt="brand"
          src={`${baseURL}/images/${imageId}`}
        />
      )}
      <div className="brands-carousel-item__name">{title?.toUpperCase()}</div>
    </div>
  );
};
