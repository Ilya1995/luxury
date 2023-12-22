import { FC, useState, useMemo } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Icon } from '../ui/Icon';
import { Counter } from '../ui/Counter';
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
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('');

  const selectedCount = useMemo(() => {
    let count = 0;

    if (typeProduct) count++;
    if (isOnlyStock) count++;
    if (brands.length) {
      count += brands.length;
    }
    if (colors.length) {
      count += colors.length;
    }

    return count;
  }, [typeProduct, isOnlyStock, brands.length, colors.length]);

  const handleOpenCurrentFilter = (value: string) => {
    setCurrentFilter(value);
    setIsOpenSecond(true);
  };

  return (
    <div className={classNames('filter-mobile', className)}>
      <MenuFilterList
        isOpen={isOpen}
        typeProduct={typeProduct}
        brands={brands}
        colors={colors}
        onChangeOpen={setIsOpen}
        isOnlyStock={isOnlyStock}
        onChangeFilter={onChangeFilter}
        onOpenCurrentFilter={handleOpenCurrentFilter}
      />
      {isOpen && (
        <MenuFilterItem
          isOpen={isOpenSecond}
          currentFilter={currentFilter}
          onChangeFilter={onChangeFilter}
          typeProduct={typeProduct}
          brands={brands}
          colors={colors}
          onClose={() => setIsOpenSecond(false)}
        />
      )}
      <div className="filter-mobile__button" onClick={() => setIsOpen(true)}>
        {t('filters')}
        <Icon name="filter" color="rgba(var(--grey-800))" size={1.5} />
        {!!selectedCount && <Counter value={selectedCount} />}
      </div>
    </div>
  );
};
