import { FC, useState } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Mousewheel, Navigation } from 'swiper/modules';
import { Animate } from 'react-simple-animate';

import { Product } from '../../types';
import { Icon } from '../ui/Icon';
import { ModalPhoto } from '../modals/ModalPhoto';
import { SwiperNav } from './SwiperNav';

import './styles.scss';

type PropsType = {
  product: Product;
  className?: string;
};

export const CatalogCardPhoto: FC<PropsType> = ({ className, product }) => {
  const [activePhoto, setActivePhoto] = useState(product.src);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [showNavButton, setShowNavButton] = useState({
    showPrev: false,
    showNext: product.photos.length > 4,
  });

  const handleChangeShowNawButtons = ({
    isBeginning,
    isEnd,
    activeIndex,
  }: SwiperClass) => {
    setActiveIndex(activeIndex);
    setShowNavButton({ showPrev: !isBeginning, showNext: !isEnd });
  };

  const showMask = (direction: 'left' | 'right', index: number) => {
    if (direction === 'right') {
      return Boolean(
        index > activeIndex + 2 && product.photos.length - 1 !== index
      );
    }

    if (direction === 'left') {
      return Boolean(activeIndex === index && activeIndex);
    }

    return false;
  };

  return (
    <div className={classNames('catalog-card-photo', className)}>
      {openModal && (
        <ModalPhoto
          active={activePhoto}
          photos={product.photos}
          onClose={() => setOpenModal(false)}
        />
      )}

      <div className="catalog-card-photo__wrapper-img">
        <Animate
          play
          key={activePhoto}
          start={{ opacity: 0.6 }}
          end={{ opacity: 1 }}
          duration={0.3}
          easeType="ease-in"
        >
          <img
            className="catalog-card-photo__img"
            src={activePhoto}
            onClick={() => setOpenModal(true)}
            alt="card"
          />
        </Animate>

        <Icon
          name="c-search"
          pointer
          handleClick={() => setOpenModal(true)}
          className="catalog-card-photo__icon"
          size={1.5}
        />
      </div>
      {!!product.photos.length && (
        <div className="catalog-card-photo__carousel">
          <Swiper
            slidesPerView={4}
            spaceBetween={16}
            speed={800}
            onActiveIndexChange={handleChangeShowNawButtons}
            wrapperClass="catalog-card-photo__carousel-wrapper"
            mousewheel={product.photos.length > 4}
            modules={[Mousewheel, Navigation]}
          >
            {product.photos.map((photo, index) => (
              <SwiperSlide key={photo}>
                <img
                  className={classNames('catalog-card-photo__carousel-img', {
                    'catalog-card-photo__carousel-img_active':
                      photo === activePhoto,
                  })}
                  src={photo}
                  onClick={() => setActivePhoto(photo)}
                  alt="furniture"
                />
                {showMask('right', index) && (
                  <div className="mask mask_right" />
                )}
                {showMask('left', index) && <div className="mask mask_left" />}
              </SwiperSlide>
            ))}
            {showNavButton.showPrev && (
              <>
                <SwiperNav nav="prev" />
                <div className="catalog-card-photo__carousel-arrow-bg -prev" />
              </>
            )}
            {showNavButton.showNext && (
              <>
                <SwiperNav nav="next" />
                <div className="catalog-card-photo__carousel-arrow-bg -next" />
              </>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
};
