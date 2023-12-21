import { FC, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Icon } from '../ui/Icon';
import { MenuFilterList } from './MenuFilterList';
import { MenuFilterItem } from './MenuFilterItem';

import './styles.scss';

type PropsType = {
  onChangeFilter: (type: string, value?: string | string[] | boolean) => void;
  typeProduct: string;
  brands: string[];
  isOnlyStock: boolean;
  colors: string[];
  className?: string;
};

export const FilterMobile: FC<PropsType> = ({
  className,
  onChangeFilter,
  typeProduct,
  brands,
  isOnlyStock,
  colors,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('');

  const handleOpenCurrentFilter = (value: string) => {
    setCurrentFilter(value);
  };

  return (
    <div className={classNames('filter-mobile', className)}>
      <MenuFilterList
        isOpen={isOpen}
        typeProduct={typeProduct}
        onChangeOpen={setIsOpen}
        isOnlyStock={isOnlyStock}
        onChangeFilter={onChangeFilter}
        onOpenCurrentFilter={handleOpenCurrentFilter}
      />
      <MenuFilterItem
        currentFilter={currentFilter}
        onChangeFilter={onChangeFilter}
        typeProduct={typeProduct}
        onClose={() => setCurrentFilter('')}
        onApply={() => setCurrentFilter('')}
      />
      <div className="filter-mobile__button" onClick={() => setIsOpen(true)}>
        {t('filters')}
        <Icon name="filter" color="rgba(var(--grey-800))" size={1.5} />
      </div>
    </div>
  );
};
