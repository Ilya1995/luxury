import { FC, useState } from 'react';
import { Animate } from 'react-simple-animate';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Dropdown } from '../Dropdown';
import { useWatch } from '../../hooks';
import {
  brandsOptions,
  typeProductOptions,
  availabilityOptions,
  colorOptions,
} from './constants';

import './styles.scss';

type PropsType = {
  onChangeFilter: (value: any) => void;
  className?: string;
};

export const Filter: FC<PropsType> = ({ className, onChangeFilter }) => {
  const { t } = useTranslation();
  const [typeProduct, setTypeProduct] = useState([]);
  const [brands, setBrands] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [colors, setColors] = useState([]);

  useWatch(() => {
    handleChangeFilter();
  }, [typeProduct, brands, availability, colors]);

  const handleChangeFilter = () => {
    const filters = {
      typeProduct,
      brands,
      availability,
      colors,
    };

    onChangeFilter(filters);
  };

  const handleResetFilters = () => {
    if (!showResetFilters) return;

    setTypeProduct([]);
    setBrands([]);
    setAvailability([]);
    setColors([]);
  };

  const showResetFilters =
    !!typeProduct.length ||
    !!brands.length ||
    !!availability.length ||
    !!colors.length;

  return (
    <div className={classNames('filter', className)}>
      <Dropdown
        options={typeProductOptions}
        title="Тип продукта"
        selected={typeProduct}
        classNameList="filter__product-list"
        onChange={setTypeProduct}
      />
      <Dropdown
        options={brandsOptions}
        title="Бренд"
        withSearch
        selected={brands}
        classNameList="filter__brand-list"
        onChange={setBrands}
      />
      <Dropdown
        options={availabilityOptions}
        title="Наличие"
        multiple
        selected={availability}
        onChange={setAvailability}
      />
      <Dropdown
        options={colorOptions}
        title="Цвет"
        multiple
        selected={colors}
        classNameList="filter__color-list"
        onChange={setColors}
      />
      <Animate
        play={showResetFilters}
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}
        easeType="ease-in"
        duration={0.3}
      >
        <button
          className="button shadow filter__button"
          onClick={handleResetFilters}
        >
          {t('reset-filters')}
        </button>
      </Animate>
    </div>
  );
};
