import { FC, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { CatalogCardPreview } from '../CatalogCardPreview';
import { ModalFeedback } from '../modals/ModalFeedback';
import { ModalFeedbackSuccess } from '../modals/ModalFeedbackSuccess';
import { data } from '../ProductsNotFound/mock';
import { Product } from '../../types';

import './styles.scss';

type PropsType = {
  product: Product;
  className?: string;
  isMobile?: boolean;
};

export const CatalogCardInfo: FC<PropsType> = ({
  className,
  product,
  isMobile,
}) => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSecondModal, setIsOpenSecondModal] = useState(false);

  const handleGoToCard = (id: number) => {
    navigate(`/catalog/all/${id}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleApplyFeedback = () => {
    setIsOpenModal(false);
    setIsOpenSecondModal(true);
  };

  return (
    <div className={classNames('catalog-card-info', className)}>
      <ModalFeedback
        isOpen={isOpenModal}
        product={product}
        onClose={() => setIsOpenModal(false)}
        onApply={handleApplyFeedback}
      />
      <ModalFeedbackSuccess
        isOpen={isOpenSecondModal}
        onClose={() => setIsOpenSecondModal(false)}
      />
      <div className="catalog-card-info__header">
        <div className="catalog-card-info__header-brand">{product.brand}</div>
        <div className="catalog-card-info__header-name">{product.name}</div>
        <div className="catalog-card-info__header-material">
          {product.material}
        </div>
        <div className="catalog-card-info__header-price">Цена по запросу</div>
      </div>

      {!isMobile && (
        <button
          className="catalog-card-info__button button"
          onClick={() => setIsOpenModal(true)}
        >
          Уточнить наличие
        </button>
      )}

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

      {isMobile && (
        <div className="catalog-card-info__like">
          <div className="catalog-card-info__like-header">
            Вам может понравиться
          </div>
          <div className="catalog-card-info__like-products">
            {data.map((card) => (
              <CatalogCardPreview
                key={card.id}
                {...card}
                onGoToCard={handleGoToCard}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
