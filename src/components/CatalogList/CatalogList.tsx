import { FC } from 'react';
import classNames from 'classnames';

import { CatalogCardPreview, Skeleton } from '../CatalogCardPreview';
import { Product } from '../../types';

import './styles.scss';

type PropsType = {
  products: Product[];
  isLoading: boolean;
  onGoToCard: (id: number) => void;
  className?: string;
};

export const CatalogList: FC<PropsType> = ({
  className,
  isLoading,
  products,
  onGoToCard,
}) => {
  return (
    <div className={classNames('catalog-list', className)}>
      {!isLoading &&
        products.map((card) => (
          <CatalogCardPreview key={card.id} {...card} onGoToCard={onGoToCard} />
        ))}
      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7].map((value) => <Skeleton key={value} />)}
    </div>
  );
};
