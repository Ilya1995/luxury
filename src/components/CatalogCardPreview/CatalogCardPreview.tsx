import { FC } from 'react';
import classNames from 'classnames';

import './styles.scss';
import { Brand } from '../../store/types';
import { baseURL } from '../..';

type PropsType = {
  id: number;
  src: string;
  brand: Brand | null;
  materials: string | null;
  imageId: number | null;
  title: string;
  onGoToCard: (id: number) => void;
  className?: string;
};

export const CatalogCardPreview: FC<PropsType> = ({
  className,
  id,
  title,
  brand,
  materials,
  imageId,
  onGoToCard,
}) => {
  return (
    <div
      className={classNames('catalog-card-preview', className)}
      onClick={() => onGoToCard(id)}
    >
      {imageId && (
        <img
          className="catalog-card-preview__img"
          src={`${baseURL}/images/${imageId}`}
          alt="card"
        />
      )}
      <div className="catalog-card-preview__content">
        <div className="catalog-card-preview__content-info">
          {brand?.title && (
            <div className="catalog-card-preview__brand">{brand.title}</div>
          )}
          <div className="catalog-card-preview__name">{title}</div>
        </div>

        <div className="catalog-card-preview__content-info">
          <div className="catalog-card-preview__material">
            {materials || 'Фарфор, эмаль'}
          </div>
          <div className="catalog-card-preview__price">Цена по запросу</div>
        </div>
      </div>
    </div>
  );
};
