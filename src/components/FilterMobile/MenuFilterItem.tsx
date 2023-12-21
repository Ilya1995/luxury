import { FC } from 'react';
import classNames from 'classnames';

import { Icon } from '../ui/Icon';
import { Dropdown } from '../Dropdown';
import { typeProductOptions } from '../Filter/constants';

import './styles.scss';

type PropsType = {
  currentFilter: string;
  onChangeFilter: (type: string, value?: string | string[] | boolean) => void;
  onClose: () => void;
  onApply: () => void;
  typeProduct: string;
  className?: string;
};

export const MenuFilterItem: FC<PropsType> = ({
  className,
  currentFilter,
  typeProduct,
  onChangeFilter,
  onClose,
  onApply,
}) => {
  return (
    <div
      className={classNames('menu-filter-item', className, {
        'menu-filter-item_open': !!currentFilter,
      })}
    >
      <div>
        <Icon
          name="arrow-left"
          color="rgba(var(--grey-800))"
          size={1.5}
          handleClick={onClose}
        />
        <div className="menu-filter-item__content">
          <Dropdown
            options={typeProductOptions}
            isMobile
            title="Тип продукта"
            selected={typeProduct}
            onChange={(value) => onChangeFilter('product', value)}
          />
        </div>
      </div>
    </div>
  );
};
