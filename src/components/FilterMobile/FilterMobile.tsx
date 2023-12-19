import { FC, useState } from 'react';
import { Animate } from 'react-simple-animate';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Dropdown } from '../Dropdown';
import { Icon } from '../ui/Icon';
import { useWatch } from '../../hooks';
import {
  brandsOptions,
  typeProductOptions,
  colorOptions,
} from '../Filter/constants';
import { MenuFilterList } from './MenuFilterList';

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

  return (
    <div className={classNames('filter-mobile', className)}>
      <MenuFilterList
        isOpen={isOpen}
        onChangeOpen={setIsOpen}
        isOnlyStock={isOnlyStock}
        onChangeFilter={onChangeFilter}
      />
      <div className="filter-mobile__button" onClick={() => setIsOpen(true)}>
        {t('filters')}
        <Icon
          //   className={classNames('dropdown-header-icon', {
          //     'dropdown-header-icon_open': isOpen,
          //   })}
          name="filter"
          color="rgba(var(--grey-800))"
          size={1.5}
        />
      </div>
    </div>
  );
};
