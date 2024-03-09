import { FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { CatalogCardPreview } from '../CatalogCardPreview';
import { data } from './mock';

import './styles.scss';

type PropsType = {
  searchEmpty: boolean;
  isMobile: boolean;
  onGoToCard: (id: number) => void;
  className?: string;
};

export const ProductsNotFound: FC<PropsType> = ({
  className,
  searchEmpty,
  isMobile,
  onGoToCard,
}) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('products-not-found', className)}>
      {!searchEmpty && (
        <>
          <div className="products-not-found__text">
            {t('not-found-search')}
          </div>
          {/* <div className="products-not-found__header">
            Вам может понравиться
          </div>
          <div className="products-not-found__products">
            {data.map((card) => (
              <CatalogCardPreview
                key={card.id}
                {...card}
                onGoToCard={onGoToCard}
              />
            ))}
          </div> */}
        </>
      )}

      {searchEmpty && (
        <>
          {!isMobile && (
            <>
              <div className="products-not-found__title">
                Ничего не удалось найти по вашему запросу
              </div>
              <div className="products-not-found__subtitle">
                Попробуйте отменить несколько фильтров, чтобы посмотреть больше
                товаров
              </div>
            </>
          )}

          {isMobile && (
            <div className="products-not-found__subtitle">
              Ничего не удалось найти по вашему запросу. Попробуйте отменить
              несколько фильтров, чтобы посмотреть больше товаров
            </div>
          )}
        </>
      )}
    </div>
  );
};
