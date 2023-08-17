import { FC } from 'react';
import { useSwiperSlide } from 'swiper/react';
import classNames from 'classnames';

import { useMedia } from '../../hooks';

import './styles.scss';

type PropsType = {
  pictureUrl: string;
  title: string;
};

export const BrandsCarouselItem: FC<PropsType> = ({ pictureUrl, title }) => {
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
      <img className="brands-carousel-item__img" alt="brand" src={pictureUrl} />
      <div className="brands-carousel-item__name">{title}</div>
    </div>
  );
};
