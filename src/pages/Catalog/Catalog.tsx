import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useMedia, useWatch } from '../../hooks';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Tab } from '../../components/Tab';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Filter } from '../../components/Filter';
import { FilterMobile } from '../../components/FilterMobile';
import { CatalogList } from '../../components/CatalogList';
import { TabType } from '../../types';
import { RootState } from '../../store';
import { tabs } from './constants';

import './styles.scss';

export const Catalog: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tab } = useParams();

  const isMobile = useMedia('(max-width: 768px)');
  const [activeTab, setActiveTab] = useState<TabType>();
  const [isLoading, setIsLoading] = useState(true);
  const [typeProduct, setTypeProduct] = useState('');
  const [brands, setBrands] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const { searchText } = useSelector((state: RootState) => state.general);

  useEffect(() => {
    getCatalog();
  }, [activeTab, typeProduct, brands, availability, colors, searchText]);

  useWatch(() => {
    handleResetFilters();

    if (!tab) {
      setActiveTab(undefined);
      return;
    }

    const newTab = tabs.find(({ path }) => path === tab);

    newTab ? setActiveTab(newTab) : navigate('/');
  }, [tab, navigate]);

  const getCatalog = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleChangeTab = (tab: TabType) => {
    const newTab = activeTab?.label === tab.label ? undefined : tab;
    navigate(newTab ? `/catalog/${tab.path}` : '/catalog');
  };

  const handleChangeFilter = (type: string, value?: string | string[]) => {
    if (type === 'reset') {
      return handleResetFilters();
    }

    if (type === 'product' && typeof value === 'string') {
      return setTypeProduct(value);
    }

    if (type === 'brand' && Array.isArray(value)) {
      return setBrands(value);
    }

    if (type === 'availability' && Array.isArray(value)) {
      return setAvailability(value);
    }

    if (type === 'color' && Array.isArray(value)) {
      return setColors(value);
    }
  };

  const handleResetFilters = () => {
    setTypeProduct('');
    setBrands([]);
    setAvailability([]);
    setColors([]);
  };

  return (
    <div className="page catalog-page">
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
        {!isMobile && <Breadcrumbs />}
        {!searchText && (
          <div className="catalog-page__title">
            {activeTab?.label || t('catalog')}
          </div>
        )}
        {!isMobile && searchText && (
          <div className="catalog-page-find">
            <div className="catalog-page-find__result">
              Найдено&nbsp;
              {!isLoading && (
                <span className="catalog-page-find__result-count">
                  7 товаров
                </span>
              )}
              {isLoading && (
                <div className="catalog-page-find__result-count-skeleton" />
              )}
              &nbsp;по запросу
            </div>
            <div className="catalog-page-find__text">{searchText}</div>
          </div>
        )}
        <div className="catalog-page-blocks">
          {!isMobile && (
            <Filter
              onChangeFilter={handleChangeFilter}
              typeProduct={typeProduct}
              brands={brands}
              availability={availability}
              colors={colors}
            />
          )}
          {isMobile && (
            <FilterMobile
              onChangeFilter={handleChangeFilter}
              typeProduct={typeProduct}
              brands={brands}
              availability={availability}
              colors={colors}
            />
          )}
          {/* TODO: адаптировать скелетон */}
          <CatalogList isLoading={isLoading} />
        </div>
      </div>

      <Footer isMobile={isMobile} />
    </div>
  );
};
