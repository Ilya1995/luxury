import { FC } from 'react';
import classNames from 'classnames';

import { CatalogCardPreview, Skeleton } from '../CatalogCardPreview';
import { data } from './mock';

import './styles.scss';

type PropsType = {
  isLoading: boolean;
  className?: string;
};

export const CatalogList: FC<PropsType> = ({ className, isLoading }) => {
  return (
    <div className={classNames('catalog-list', className)}>
      {!isLoading &&
        data.map((card) => <CatalogCardPreview key={card.id} {...card} />)}
      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7].map((value) => <Skeleton key={value} />)}
    </div>
  );
};
