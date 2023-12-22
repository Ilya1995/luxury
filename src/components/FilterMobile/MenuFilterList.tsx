import { FC, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Animate } from 'react-simple-animate';

import { TabType } from '../../types';
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
  brands: string[];
  colors: string[];
  className?: string;
};

export const MenuFilterList: FC<PropsType> = ({
  className,
  isOpen,
  isOnlyStock,
  typeProduct,
  brands,
  colors,
  onChangeFilter,
  onChangeOpen,
  onOpenCurrentFilter,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const showGoods = useMemo(() => {
    return Boolean(
      typeProduct || isOnlyStock || brands.length || colors.length
    );
  }, [typeProduct, isOnlyStock, brands.length, colors.length]);

  const handleRemoveItem = (type: string, value?: TabType) => {
    if (type === 'product') {
      onChangeFilter('product', '');
    }

    if (type === 'brand' && value) {
      const newBrands = brands.filter((brand) => brand !== value.label);
      onChangeFilter('brand', newBrands);
    }

    if (type === 'color' && value) {
      const newColors = colors.filter((color) => color !== value.label);
      onChangeFilter('color', newColors);
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
          className="menu-filter-list__close"
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
              <div className="menu-filter-list-item__tabs">
                <Tab
                  item={{ label: typeProduct, path: typeProduct }}
                  onClose={() => handleRemoveItem('product')}
                  hasClose
                />
              </div>
            )}
          </div>

          <div className="menu-filter-list-item-wrapper">
            <div
              className="menu-filter-list-item"
              onClick={() => onOpenCurrentFilter('brand')}
            >
              <div className="menu-filter-list-item__label">Бренд</div>
              <div className="menu-filter-list-item__action">
                {!!brands.length && <Counter value={brands.length} />}
                <Icon
                  name="arrow-right3"
                  color="rgba(var(--grey-600))"
                  size={1.5}
                />
              </div>
            </div>
            {!!brands.length && (
              <div className="menu-filter-list-item__tabs">
                {brands.map((brand) => (
                  <Tab
                    key={brand}
                    item={{ label: brand, path: brand }}
                    onClose={(value) => handleRemoveItem('brand', value)}
                    hasClose
                  />
                ))}
              </div>
            )}
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

          <div className="menu-filter-list-item-wrapper">
            <div
              className="menu-filter-list-item"
              onClick={() => onOpenCurrentFilter('color')}
            >
              <div className="menu-filter-list-item__label">Цвет</div>
              <div className="menu-filter-list-item__action">
                {!!colors.length && <Counter value={colors.length} />}
                <Icon
                  name="arrow-right3"
                  color="rgba(var(--grey-600))"
                  size={1.5}
                />
              </div>
            </div>
            {!!colors.length && (
              <div className="menu-filter-list-item__tabs">
                {colors.map((color) => (
                  <Tab
                    key={color}
                    item={{ label: color, path: color }}
                    onClose={(value) => handleRemoveItem('color', value)}
                    hasClose
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Animate
        play={showGoods}
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}
        easeType="ease-in"
        duration={0.3}
      >
        <div className="menu-filter-list-wrapper">
          <button className="button shadow" onClick={() => onChangeOpen(false)}>
            Показать 7 товаров
          </button>
        </div>
      </Animate>
    </div>
  );
};
