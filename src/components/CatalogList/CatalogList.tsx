import { FC } from 'react';
import classNames from 'classnames';

import './styles.scss';

type PropsType = {
  className?: string;
};

export const CatalogList: FC<PropsType> = ({ className }) => {
  return (
    <div className={classNames('catalog-list', className)}>Каталог список</div>
  );
};
