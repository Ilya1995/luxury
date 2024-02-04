import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Mousewheel, Navigation } from 'swiper/modules';

import { ModalPhotoMobile } from '../modals/ModalPhotoMobile';
import { Product } from '../../types';

import './styles.scss';

type PropsType = {
  product: Product;
  className?: string;
};

export const CatalogCardPhotoMobile: FC<PropsType> = ({
  className,
  product,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePhoto, setActivePhoto] = useState<string | null>();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    const callback = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);

  const widthLine = (innerWidth - 32) / product.photos.length;

  const handleChangeShowNawButtons = ({ activeIndex }: SwiperClass) => {
    setActiveIndex(activeIndex);
  };

  const showScroll = product.photos.length > 1;

  return (
    <div className={classNames('catalog-card-photo-mobile', className)}>
      {!!activePhoto && (
        <ModalPhotoMobile
          initialActiveIndex={activeIndex}
          photos={product.photos}
          onClose={() => setActivePhoto(null)}
        />
      )}
      <div>
        <Swiper
          slidesPerView={1}
          speed={800}
          slidesOffsetBefore={16}
          slidesOffsetAfter={-16}
          onActiveIndexChange={handleChangeShowNawButtons}
          mousewheel
          modules={[Mousewheel, Navigation]}
        >
          {product.photos.map((photo) => (
            <SwiperSlide key={photo}>
              <img
                className={classNames('catalog-card-photo-mobile__img')}
                src={photo}
                onClick={() => setActivePhoto(photo)}
                alt="furniture"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {showScroll && (
        <div className="catalog-card-photo-mobile__scroll">
          <div
            className="catalog-card-photo-mobile__scroll-item"
            style={{
              width: `${widthLine}px`,
              transform: `translateX(${activeIndex * widthLine}px)`,
            }}
          />
        </div>
      )}
    </div>
  );
};
