import { FC, useState, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Icon } from '../ui/Icon';
import { Counter } from '../ui/Counter';
import { MenuFilterList } from './MenuFilterList';
import { MenuFilterItem } from './MenuFilterItem';
import type { Product } from '../../types';
import { data as mockProducts } from '../../components/CatalogList/mock';

import './styles.scss';

type PropsType = {
  onChangeAllFilters: (filters: {
    typeProduct: string;
    brands: string[];
    isOnlyStock: boolean;
    // colors: string[];
  }) => void;
  typeProduct: string;
  brands: string[];
  isOnlyStock: boolean;
  // colors: string[];
  className?: string;
};

export const FilterMobile: FC<PropsType> = ({
  className,
  onChangeAllFilters,
  typeProduct,
  brands,
  isOnlyStock,
  // colors,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const [localTypeProduct, setLocalTypeProduct] = useState('');
  const [localBrands, setLocalBrands] = useState<string[]>([]);
  const [localIsOnlyStock, setLocalIsOnlyStock] = useState(false);
  // const [localColors, setLocalColors] = useState<string[]>([]);

  useEffect(() => {
    setLocalTypeProduct(typeProduct);
    setLocalBrands(brands);
    setLocalIsOnlyStock(isOnlyStock);
    // setLocalColors(colors);
  }, [isOpen, brands, isOnlyStock, typeProduct]);
  // }, [isOpen, brands, colors, isOnlyStock, typeProduct]);

  useEffect(() => {
    // условия для дебага
    if (localIsOnlyStock) {
      setProducts([]);
      return;
    }

    setProducts(mockProducts);
  }, [localTypeProduct, localBrands, localIsOnlyStock]);
  // }, [localTypeProduct, localBrands, localIsOnlyStock, localColors]);

  const handleApplyFilters = () => {
    setIsOpen(false);
    onChangeAllFilters({
      typeProduct: localTypeProduct,
      brands: localBrands,
      isOnlyStock: localIsOnlyStock,
      // colors: localColors,
    });
  };

  const handleResetFilters = () => {
    setIsOpen(false);
    onChangeAllFilters({
      typeProduct: '',
      brands: [],
      isOnlyStock: false,
      // colors: [],
    });
  };

  const handleChangeFilter = (
    type: string,
    value?: string | string[] | boolean
  ) => {
    if (type === 'product' && typeof value === 'string') {
      return setLocalTypeProduct(value);
    }

    if (type === 'brand' && Array.isArray(value)) {
      return setLocalBrands(value);
    }

    if (type === 'isOnlyStock' && typeof value === 'boolean') {
      return setLocalIsOnlyStock(value);
    }

    // if (type === 'color' && Array.isArray(value)) {
    //   return setLocalColors(value);
    // }
  };

  const selectedCount = useMemo(() => {
    let count = 0;

    if (typeProduct) count++;
    if (isOnlyStock) count++;
    if (brands.length) {
      count += brands.length;
    }
    // if (colors.length) {
    //   count += colors.length;
    // }

    return count;
  }, [typeProduct, isOnlyStock, brands.length]);
  // }, [typeProduct, isOnlyStock, brands.length, colors.length]);

  const handleOpenCurrentFilter = (value: string) => {
    setCurrentFilter(value);
    setIsOpenSecond(true);
  };

  return (
    <div className={classNames('filter-mobile', className)}>
      <MenuFilterList
        isOpen={isOpen}
        typeProduct={localTypeProduct}
        brands={localBrands}
        // colors={localColors}
        onChangeOpen={setIsOpen}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        isOnlyStock={localIsOnlyStock}
        productCount={products.length}
        onChangeFilter={handleChangeFilter}
        onOpenCurrentFilter={handleOpenCurrentFilter}
      />
      {isOpen && (
        <MenuFilterItem
          isOpen={isOpenSecond}
          currentFilter={currentFilter}
          onChangeFilter={handleChangeFilter}
          typeProduct={localTypeProduct}
          brands={localBrands}
          // colors={localColors}
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
