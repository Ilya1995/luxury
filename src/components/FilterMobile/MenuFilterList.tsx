import { FC, useEffect } from 'react';
import classNames from 'classnames';

import { Icon } from '../ui/Icon';
import { Switcher } from '../ui/Switcher';
import { Counter } from '../ui/Counter';
import { Tab } from '../Tab';

import './styles.scss';

type PropsType = {
  isOpen: boolean;
  onChangeOpen: (value: boolean) => void;
  onChangeFilter: (type: string, value?: string | string[] | boolean) => void;
  onOpenCurrentFilter: (value: string) => void;
  isOnlyStock: boolean;
  typeProduct: string;
  className?: string;
};

export const MenuFilterList: FC<PropsType> = ({
  className,
  isOpen,
  isOnlyStock,
  typeProduct,
  onChangeFilter,
  onChangeOpen,
  onOpenCurrentFilter,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const handleRemoveItem = (type: string) => {
    if (type === 'product') {
      onChangeFilter('product', '');
    }
  };

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
          <div className="menu-filter-list-item-wrapper">
            <div
              className="menu-filter-list-item"
              onClick={() => onOpenCurrentFilter('product')}
            >
              <div className="menu-filter-list-item__label">Тип продукта</div>
              <div className="menu-filter-list-item__action">
                {typeProduct && <Counter value={1} />}
                <Icon
                  name="arrow-right3"
                  color="rgba(var(--grey-600))"
                  size={1.5}
                />
              </div>
            </div>
            {typeProduct && (
              <Tab
                item={{ label: typeProduct, path: typeProduct }}
                onClose={() => handleRemoveItem('product')}
                hasClose
              />
            )}
          </div>

          <div
            className="menu-filter-list-item"
            onClick={() => onOpenCurrentFilter('brand')}
          >
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
          <div
            className="menu-filter-list-item"
            onClick={() => onOpenCurrentFilter('color')}
          >
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
