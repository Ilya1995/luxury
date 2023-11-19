import { FC, useState } from 'react';
import classNames from 'classnames';

import { Dropdown } from '../Dropdown';
import { brandsOptions, typeProductOptions } from './constans';

import './styles.scss';

type PropsType = {
  className?: string;
};

export const Filter: FC<PropsType> = ({ className }) => {
  const [typeProduct, setTypeProduct] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleChangeTypeProduct = (value: any) => {
    setTypeProduct(value);
  };

  const handleChangeBrands = (value: any) => {
    setBrands(value);
  };

  return (
    <div className={classNames('filter', className)}>
      <Dropdown
        options={typeProductOptions}
        title="Тип продукта"
        selected={typeProduct}
        classNameList="filter__product-list"
        onChange={handleChangeTypeProduct}
      />
      <Dropdown
        options={brandsOptions}
        title="Бренд"
        withSearch
        selected={brands}
        classNameList="filter__product-brands"
        onChange={handleChangeBrands}
      />
    </div>
  );
};
