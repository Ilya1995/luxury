import { FC, useState } from 'react';
import { Animate } from 'react-simple-animate';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Dropdown } from '../Dropdown';
import { Icon } from '../Icon';
import { useWatch } from '../../hooks';
import {
  brandsOptions,
  typeProductOptions,
  availabilityOptions,
  colorOptions,
} from '../Filter/constants';

import './styles.scss';

type PropsType = {
  onChangeFilter: (type: string, value?: string | string[]) => void;
  typeProduct: string;
  brands: string[];
  availability: string[];
  colors: string[];
  className?: string;
};

export const FilterMobile: FC<PropsType> = ({
  className,
  onChangeFilter,
  typeProduct,
  brands,
  availability,
  colors,
}) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('filter-mobile', className)}>
      <div className="filter-mobile__button">
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
