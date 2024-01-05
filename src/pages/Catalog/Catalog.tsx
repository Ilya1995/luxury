import { FC, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useMedia, useWatch } from '../../hooks';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Tab } from '../../components/Tab';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Filter } from '../../components/Filter';
import { FilterMobile } from '../../components/FilterMobile';
import { CatalogList } from '../../components/CatalogList';
import { SearchResultText } from '../../components/SearchResultText';
import { ProductsNotFound } from '../../components/ProductsNotFound';
import { TabType, Product } from '../../types';
import { RootState } from '../../store';
import { setSearchText } from '../../store/reducer';
import { data as mockProducts } from '../../components/CatalogList/mock';

import { tabs } from './constants';

import './styles.scss';

export const Catalog: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { tab } = useParams();

  const isMobile = useMedia('(max-width: 768px)');
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const newTab = tabs.find(({ path }) => path === tab);
    return newTab ? newTab : tabs[0];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [typeProduct, setTypeProduct] = useState('');
  const [brands, setBrands] = useState<string[]>([]);
  const [isOnlyStock, setIsOnlyStock] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const [colors, setColors] = useState<string[]>([]);
  const { searchText } = useSelector((state: RootState) => state.general);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // условия для дебага
      if (searchText === '11' || searchText === '111') {
        setProducts([]);
        return;
      }

      if (isOnlyStock) {
        setProducts([]);
        return;
      }

      setProducts(mockProducts);
    }, 2000);
  }, [activeTab, typeProduct, brands, isOnlyStock, colors, searchText]);

  useEffect(() => {
    const newTab = tabs.find(({ path }) => path === tab);

    if (!newTab && pathname !== '/catalog') {
      navigate('/');
    }
  }, [tab, pathname, navigate]);

  useWatch(() => {
    handleResetFilters();

    if (!tab) {
      setActiveTab(tabs[0]);
      return;
    }

    const newTab = tabs.find(({ path }) => path === tab);

    newTab ? setActiveTab(newTab) : navigate('/');
  }, [tab, navigate]);

  const title = useMemo(() => {
    if (activeTab.path === 'all') return t('catalog');
    return activeTab?.label || t('catalog');
  }, [t, activeTab]);

  const handleChangeTab = (tab: TabType) => {
    if (tab.path === 'all' || activeTab.label === tab.label) {
      return navigate('/catalog');
    }

    navigate(`/catalog/${tab.path}`);
  };

  const handleGoToCard = (id: number) => {
    navigate(`/catalog/${activeTab.path}/${id}`);
  };

  const handleChangeFilter = (
    type: string,
    value?: string | string[] | boolean
  ) => {
    if (type === 'reset') {
      return handleResetFilters();
    }

    if (type === 'product' && typeof value === 'string') {
      return setTypeProduct(value);
    }

    if (type === 'brand' && Array.isArray(value)) {
      return setBrands(value);
    }

    if (type === 'isOnlyStock' && typeof value === 'boolean') {
      return setIsOnlyStock(value);
    }

    if (type === 'color' && Array.isArray(value)) {
      return setColors(value);
    }
  };

  const handleResetFilters = () => {
    setTypeProduct('');
    setBrands([]);
    setIsOnlyStock(false);
    setColors([]);
    dispatch(setSearchText(''));
  };

  const showTitle = !searchText && (!isMobile || !!products.length);
  const showSearchResult = searchText || (isMobile && !products.length);
  const showCatalog = !!products.length || isLoading;
  const showNotFound = !products.length && !isLoading;
  const showBreadcrumbs = !isMobile && !searchText;
  const showFilterDesk =
    !isMobile && (!!products.length || !searchText || isLoading);

  return (
    <div className="catalog-page">
      <Header className="catalog-page__header" isMobile={isMobile} />

      <div className="catalog-page__content">
        <div className="catalog-page-tabs">
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              item={tab}
              isActive={activeTab.label === tab.label}
              onClick={handleChangeTab}
            />
          ))}
        </div>
        {showBreadcrumbs && <Breadcrumbs />}
        {isMobile && (
          <FilterMobile
            onChangeFilter={handleChangeFilter}
            typeProduct={typeProduct}
            brands={brands}
            isOnlyStock={isOnlyStock}
            colors={colors}
          />
        )}
        {showTitle && <div className="catalog-page__title">{title}</div>}
        {showSearchResult && (
          <SearchResultText
            isLoading={isLoading}
            text={searchText}
            count={products.length}
            className="catalog-page__search-result"
          />
        )}
        <div className="catalog-page-blocks">
          {showFilterDesk && (
            <Filter
              onChangeFilter={handleChangeFilter}
              typeProduct={typeProduct}
              brands={brands}
              isOnlyStock={isOnlyStock}
              colors={colors}
            />
          )}
          {showCatalog && (
            <CatalogList
              isLoading={isLoading}
              products={products}
              onGoToCard={handleGoToCard}
            />
          )}
          {showNotFound && (
            <ProductsNotFound
              searchEmpty={!searchText}
              isMobile={isMobile}
              onGoToCard={handleGoToCard}
            />
          )}
        </div>
      </div>

      <Footer isMobile={isMobile} />
    </div>
  );
};
