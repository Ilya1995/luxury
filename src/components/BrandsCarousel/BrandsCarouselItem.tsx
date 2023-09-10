import { FC, useEffect, useState } from 'react';
import { useSwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import axios from 'axios';

import { useMedia } from '../../hooks';

import './styles.scss';

type PropsType = {
  imageId: number;
  title: string;
};

export const BrandsCarouselItem: FC<PropsType> = ({ imageId, title }) => {
  const swiperSlide = useSwiperSlide();
  const [imgSrc, setImgSrc] = useState();
  const isMobile = useMedia('(max-width: 550px)');

  useEffect(() => {
    load();
  }, [imageId]);

  const load = async () => {
    if (!imageId) return;

    const config: any = {
      url: 'images/' + imageId,
      method: 'get',
      responseType: 'blob',
    };
    const response = await axios.request(config);
    setImgSrc(response.data);
  };

  const isVisible = isMobile
    ? swiperSlide.isActive
    : Object.values(swiperSlide).some(Boolean);

  return (
    <div
      className={classNames('brands-carousel-item', {
        'brands-carousel-item_visited': isVisible,
      })}
    >
      {imgSrc && (
        <img
          className="brands-carousel-item__img"
          alt="brand"
          src={URL.createObjectURL(imgSrc)}
        />
      )}
      <div className="brands-carousel-item__name">{title}</div>
    </div>
  );
};
