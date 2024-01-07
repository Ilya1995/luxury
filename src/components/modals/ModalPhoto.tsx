import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Icon } from '../ui/Icon';

import './styles.scss';

type PropsType = {
  photos: string[];
  active: string;
  onClose: () => void;
  className?: string;
};

export const ModalPhoto: FC<PropsType> = ({
  className,
  photos,
  active,
  onClose,
}) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [activePhoto, setActivePhoto] = useState(active);
  const [activeIndex, setActiveIndex] = useState(
    () => photos.findIndex((photo) => photo === active) || 0
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const callback = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);

  const widthLine = (innerWidth - 32) / photos.length;

  return (
    <div className={classNames('modal-photo', className)}>
      <Icon
        name="close2"
        handleClick={onClose}
        className="modal-photo__close"
        color="rgba(var(--grey-600))"
        pointer
        size={2}
      />
      <div className="modal-photo__content">
        <img className="modal-photo__active-img" src={activePhoto} alt="img" />
        <div className="modal-photo__scroll-wrapper">
          <div className="modal-photo__scroll">
            <div
              className="modal-photo__scroll-item"
              style={{
                width: `${widthLine}px`,
                transform: `translateX(${activeIndex * widthLine}px)`,
              }}
            />
          </div>
          <div className="modal-photo__scroll-label">
            {activeIndex + 1} из {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
};
