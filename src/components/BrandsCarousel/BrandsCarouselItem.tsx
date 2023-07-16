import { FC } from 'react';

import './styles.scss';

type PropsType = {
  src: string;
  name: string;
};

export const BrandsCarouselItem: FC<PropsType> = ({ src, name }) => {
  return (
    <div className="brands-carousel-item">
      <img className="brands-carousel-item__img" alt="Бренд" src={src} />
      <div className="brands-carousel-item__name">{name}</div>
    </div>
  );
};
