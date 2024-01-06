import { FC } from 'react';
import classNames from 'classnames';

import { Product } from '../../types';

import './styles.scss';

type PropsType = {
  product: Product;
  className?: string;
};

export const CatalogCardInfo: FC<PropsType> = ({ className, product }) => {
  return (
    <div className={classNames('catalog-card-info', className)}>
      <div className="catalog-card-info__header">
        <div className="catalog-card-info__header-brand">{product.brand}</div>
        <div className="catalog-card-info__header-name">{product.name}</div>
        <div className="catalog-card-info__header-material">
          {product.material}
        </div>
        <div className="catalog-card-info__header-price">Цена по запросу</div>
      </div>

      <button
        className="catalog-card-info__button button shadow"
        onClick={() => console.log('Уточнить наличие')}
      >
        Уточнить наличие
      </button>

      <div className="catalog-card-info__description">
        {product.description}
      </div>

      <div className="catalog-card-info__characteristics">
        <div className="catalog-card-info__characteristics-title">
          Характеристики
        </div>
        <div className="catalog-card-info-characteristic">
          <div className="catalog-card-info-characteristic__key">Бренд:</div>
          <div className="catalog-card-info-characteristic__value">
            {product.brand}
          </div>
        </div>
        <div className="catalog-card-info-characteristic">
          <div className="catalog-card-info-characteristic__key">Страна:</div>
          <div className="catalog-card-info-characteristic__value">
            {product.country}
          </div>
        </div>
        <div className="catalog-card-info-characteristic">
          <div className="catalog-card-info-characteristic__key">Материал:</div>
          <div className="catalog-card-info-characteristic__value">
            {product.material}
          </div>
        </div>
        {product.volume && (
          <div className="catalog-card-info-characteristic">
            <div className="catalog-card-info-characteristic__key">Объем:</div>
            <div className="catalog-card-info-characteristic__value">
              {product.volume}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
