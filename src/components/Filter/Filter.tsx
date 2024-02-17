import { FC } from 'react';
import { Animate } from 'react-simple-animate';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Dropdown } from '../Dropdown';
import { Switcher } from '../ui/Switcher';
import { brandsOptions, typeProductOptions, colorOptions } from './constants';

import './styles.scss';

type PropsType = {
  onChangeFilter: (type: string, value?: string | string[] | boolean) => void;
  typeProduct: string;
  brands: string[];
  isOnlyStock: boolean;
  // colors: string[];
  className?: string;
};

export const Filter: FC<PropsType> = ({
  className,
  onChangeFilter,
  typeProduct,
  brands,
  isOnlyStock,
  // colors,
}) => {
  const { t } = useTranslation();

  const handleResetFilters = () => {
    if (!showResetFilters) return;

    onChangeFilter('reset');
  };

  const showResetFilters = !!typeProduct || !!brands.length || isOnlyStock;
  // !!typeProduct || !!brands.length || isOnlyStock || !!colors.length;

  return (
    <div className={classNames('filter', className)}>
      <Dropdown
        options={typeProductOptions}
        title="Тип продукта"
        selected={typeProduct}
        classNameList="filter__product-list"
        onChange={(value) => onChangeFilter('product', value)}
      />
      <Dropdown
        options={brandsOptions}
        title="Бренд"
        withSearch
        selected={brands}
        classNameList="filter__brand-list"
        onChange={(value) => onChangeFilter('brand', value)}
      />
      {/* <Dropdown
        options={colorOptions}
        title="Цвет"
        multiple
        selected={colors}
        classNameList="filter__color-list"
        onChange={(value) => onChangeFilter('color', value)}
      /> */}
      <div className="filter__switcher">
        <div className="filter__switcher-label">Только товары в наличии</div>
        <Switcher
          value={isOnlyStock}
          onChange={(value) => onChangeFilter('isOnlyStock', value)}
        />
      </div>
      <Animate
        play={showResetFilters}
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}
        easeType="ease-in"
        duration={0.3}
      >
        <button className="button filter__button" onClick={handleResetFilters}>
          {t('reset-filters')}
        </button>
      </Animate>
    </div>
  );
};
