import { FC } from 'react';
import classNames from 'classnames';

import './styles.scss';

type PropsType = {
  id: number;
  src: string;
  name: string;
  brand: string;
  material: string;
  onGoToCard: (id: number) => void;
  className?: string;
};

export const CatalogCardPreview: FC<PropsType> = ({
  className,
  id,
  src,
  name,
  brand,
  material,
  onGoToCard,
}) => {
  return (
    <div
      className={classNames('catalog-card-preview', className)}
      onClick={() => onGoToCard(id)}
    >
      <img className="catalog-card-preview__img" src={src} alt="card" />
      <div className="catalog-card-preview__content">
        <div className="catalog-card-preview__content-info">
          <div className="catalog-card-preview__brand">{brand}</div>
          <div className="catalog-card-preview__name">{name}</div>
        </div>

        <div className="catalog-card-preview__content-info">
          <div className="catalog-card-preview__material">{material}</div>
          <div className="catalog-card-preview__price">Цена по запросу</div>
        </div>
      </div>
    </div>
  );
};
