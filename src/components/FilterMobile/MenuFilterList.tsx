import { FC, useEffect } from 'react';
import classNames from 'classnames';

import { Icon } from '../ui/Icon';
import { Switcher } from '../ui/Switcher';

import './styles.scss';

type PropsType = {
  isOpen: boolean;
  onChangeOpen: (value: boolean) => void;
  onChangeFilter: (type: string, value?: string | string[] | boolean) => void;
  isOnlyStock: boolean;
  className?: string;
};

export const MenuFilterList: FC<PropsType> = ({
  className,
  isOpen,
  isOnlyStock,
  onChangeFilter,
  onChangeOpen,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <div
      className={classNames('menu-filter-list', className, {
        'menu-filter-list_open': isOpen,
      })}
    >
      <div>
        <Icon
          name="close2"
          color="rgba(var(--grey-800))"
          size={1.5}
          handleClick={() => onChangeOpen(false)}
        />
        <div className="menu-filter-list__content">
          <div className="menu-filter-list-item">
            <div className="menu-filter-list-item__label">Тип продукта</div>
            <Icon
              name="arrow-right3"
              color="rgba(var(--grey-600))"
              size={1.5}
            />
          </div>
          <div className="menu-filter-list-item">
            <div className="menu-filter-list-item__label">Бренд</div>
            <Icon
              name="arrow-right3"
              color="rgba(var(--grey-600))"
              size={1.5}
            />
          </div>
          <div className="menu-filter-list-item">
            <div className="menu-filter-list-item__label">
              Только товары в наличии
            </div>
            <Switcher
              value={isOnlyStock}
              onChange={(value) => onChangeFilter('isOnlyStock', value)}
            />
          </div>
          <div className="menu-filter-list-item">
            <div className="menu-filter-list-item__label">Цвет</div>
            <Icon
              name="arrow-right3"
              color="rgba(var(--grey-600))"
              size={1.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
