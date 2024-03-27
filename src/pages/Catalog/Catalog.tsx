import { FC, useState, useEffect, useMemo, useCallback } from 'react';
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
import { getCategories } from '../../store/actionCreator';

import { tabMap } from './constants';

import './styles.scss';
import { Response } from '../../store/types';
import axios from 'axios';

export const Catalog: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { tab } = useParams();

  const { searchText, categories } = useSelector(
    (state: RootState) => state.general
  );

  const tabs = useMemo(
    () =>
      categories.map(({ title }) => ({
        label: title,
        path: tabMap[title],
      })),
    [categories]
  );

  const activeTab = useMemo<TabType | undefined>(() => {
    if (!tabs.length) return;

    const newTab = tabs.find(({ path }) => path === tab);

    return newTab ? newTab : tabs[0];
  }, [tabs, tab]);

  const isMobile = useMedia('(max-width: 768px)');
  const [isLoading, setIsLoading] = useState(true);
  const [typeProduct, setTypeProduct] = useState('');
  const [filterBrands, setBrands] = useState<string[]>([]);
  const [isOnlyStock, setIsOnlyStock] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  // const [colors, setColors] = useState<string[]>([]);
  const getBrandIds = useCallback(() => {
    return categories
      .find((category: any) => category.title === activeTab?.label)
      ?.brands.filter((brand: any) => filterBrands.includes(brand.title))
      ?.map((brand: any) => brand.id);
  }, [activeTab?.label, categories, filterBrands]);

  const getTypeId = useCallback(() => {
    return categories
      .find((category: any) => category.title === activeTab?.label)
      ?.types.find((type: any) => type.title === typeProduct)?.id;
  }, [activeTab?.label, categories, typeProduct]);

  const getCategoryId = useCallback(() => {
    return categories.find(
      (category: any) => category.title === activeTab?.label
    )?.id;
  }, [activeTab?.label, categories]);

  const getProducts = useCallback(
    async (nextPage: number) => {
      !nextPage && setIsLoading(true);

      try {
        const urlWithText = `products/text-search?text=${searchText}&page=${nextPage}&size=20`;
        let urlWithoutText = `/products/search?page=${nextPage}&size=20`;

        if (filterBrands.length) {
          const ids = getBrandIds();

          if (ids?.length) {
            urlWithoutText += '&brandIds=' + ids.join('&brandIds=');
          }
        }

        if (typeProduct) {
          const id = getTypeId();

          if (id) {
            urlWithoutText += '&typeId=' + id;
          }
        }

        const id = getCategoryId();
        if (id) {
          urlWithoutText += '&categoryIds=' + id;
        }

        if (isOnlyStock) {
          urlWithoutText += '&inStock=true';
        }

        const url = searchText ? urlWithText : urlWithoutText;
        const response: Response<any> = await axios.get(url);
        if (response.status !== 200 || typeof response.data === 'string') {
          throw new Error('bad response');
        }
        setTotal(response.data.totalElements);

        setProducts((prev) =>
          nextPage ? [...prev, ...response.data.content] : response.data.content
        );
        // setProducts(response.data.content);
        // setProducts(mockProducts.slice(0, (nextPage + 1) * 7));
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        !nextPage && setIsLoading(false);
      }

      // setTimeout(() => {
      //   !nextPage && setIsLoading(false);

      //   // условия для дебага
      //   if (searchText === '11' || searchText === '111') {
      //     setProducts([]);
      //     return;
      //   }

      //   if (isOnlyStock) {
      //     setProducts([]);
      //     return;
      //   }

      //   // добавляем по 7 элементов
      //   setProducts(mockProducts.slice(0, (nextPage + 1) * 7));
      // }, 2000);
    },
    [
      typeProduct,
      searchText,
      filterBrands,
      isOnlyStock,
      getBrandIds,
      getCategoryId,
      getTypeId,
    ]
  );

  useEffect(() => {
    if (!categories.length) {
      getCategories(dispatch);
    }
  }, [dispatch, categories.length]);

  // useEffect(() => {
  //   if (!tabs.length) return;

  //   const newTab = tabs.find(({ path }) => path === tab);

  //   setActiveTab(newTab ? newTab : tabs[0]);
  // }, [tabs]);

  useEffect(() => {
    if (!activeTab) return;
    setPage(0);
    getProducts(0);
  }, [
    activeTab,
    typeProduct,
    filterBrands,
    isOnlyStock,
    // colors,
    searchText,
    getProducts,
  ]);

  useWatch(() => {
    !!page && getProducts(page);
  }, [page, getProducts]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!tabs.length) return;
    const newTab = tabs.find(({ path }) => path === tab);

    if (!newTab && pathname !== '/catalog') {
      navigate('/');
    }
  }, [tab, tabs, pathname, navigate]);

  useWatch(() => {
    handleResetFilters();

    if (!tab) {
      // setActiveTab(tabs[0]);
      return;
    }

    const newTab = tabs.find(({ path }) => path === tab);

    if (!newTab) {
      navigate('/');
    }

    // newTab ? setActiveTab(newTab) : navigate('/');
  }, [tabs, tab, navigate]);

  const title = useMemo(() => {
    if (!activeTab || activeTab.path === 'all') return t('catalog');
    return activeTab?.label || t('catalog');
  }, [t, activeTab]);

  const typeProductOptions = useMemo<string[] | undefined>(
    () =>
      categories
        .find((category: any) => category.title === activeTab?.label)
        ?.types.map((type: any) => type.title),
    [categories, activeTab]
  );

  const brandsOptions = useMemo<string[] | undefined>(
    () =>
      categories
        .find((category: any) => category.title === activeTab?.label)
        ?.brands.map((brand: any) => brand.title),
    [categories, activeTab]
  );

  const handleChangeTab = (tab: TabType) => {
    if (tab.path === 'all' || activeTab?.label === tab.label) {
      return navigate('/catalog');
    }

    navigate(`/catalog/${tab.path}`);
  };

  const handleGoToCard = (id: number) => {
    navigate(`/catalog/${activeTab?.path}/${id}`);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleChangeAllFilters = (filters: {
    typeProduct: string;
    brands: string[];
    isOnlyStock: boolean;
    // colors: string[];
  }) => {
    setTypeProduct(filters.typeProduct);
    setBrands(filters.brands);
    setIsOnlyStock(filters.isOnlyStock);
    // setColors(filters.colors);
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

    // if (type === 'color' && Array.isArray(value)) {
    //   return setColors(value);
    // }
  };

  const handleResetFilters = () => {
    setTypeProduct('');
    setBrands([]);
    setIsOnlyStock(false);
    // setColors([]);
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
              isActive={activeTab?.label === tab.label}
              onClick={handleChangeTab}
            />
          ))}
        </div>
        {showBreadcrumbs && <Breadcrumbs />}
        {isMobile && (
          <FilterMobile
            onChangeAllFilters={handleChangeAllFilters}
            typeProduct={typeProduct}
            brands={filterBrands}
            isOnlyStock={isOnlyStock}
            typeProductOptions={typeProductOptions}
            brandsOptions={brandsOptions}
            categoryId={getCategoryId()}
            categories={categories}
            initialTotal={total}
            // colors={colors}
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
              brands={filterBrands}
              isOnlyStock={isOnlyStock}
              typeProductOptions={typeProductOptions}
              brandsOptions={brandsOptions}
              // colors={colors}
            />
          )}
          {showCatalog && (
            <CatalogList
              isLoading={isLoading}
              products={products}
              total={total}
              onNextPage={handleNextPage}
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
