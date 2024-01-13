import { FC, useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Tab } from '../../components/Tab';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useMedia } from '../../hooks';
import { Product, TabType } from '../../types';
import { data as mock1 } from '../../components/CatalogList/mock';
import { data as mock2 } from '../../components/ProductsNotFound/mock';
import { CatalogCardInfo } from '../../components/CatalogCardInfo';
import { CatalogCardPhoto } from '../../components/CatalogCardPhoto';
import { tabs } from '../Catalog/constants';

import './styles.scss';

export const CatalogCard: FC = () => {
  const isMobile = useMedia('(max-width: 768px)');
  const { tab, productId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const isCardProduct = Number(productId) > 0;

    if (!isCardProduct) {
      navigate('/');
    }
  }, [productId, navigate]);

  useEffect(() => {
    if (!productId) {
      return navigate('/');
    }

    const product1 = mock1.find((el) => el.id === +productId);
    const product2 = mock2.find((el) => el.id === +productId);
    const product3 = product1 || product2;

    if (!product3) {
      return navigate('/');
    }
    setProduct(product3);
  }, [productId, navigate]);

  const activeTab = useMemo(() => {
    const newTab = tabs.find(({ path }) => path === tab);
    return newTab ? newTab : tabs[0];
  }, [tab]);

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

  const showBreadcrumbs = !isMobile && product;
  const showTitle = !isMobile && product;

  return (
    <div className="catalog-card-page">
      <Header className="catalog-card-page__header" isMobile={isMobile} />

      <div className="catalog-card-page__content">
        <div className="catalog-card-page__tabs">
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              item={tab}
              isActive={activeTab.label === tab.label}
              onClick={handleChangeTab}
            />
          ))}
        </div>
        {showBreadcrumbs && <Breadcrumbs product={product} />}
        {showTitle && <div className="catalog-card-page__title">{title}</div>}
        {product && (
          <div className="catalog-card-page__info">
            <CatalogCardPhoto product={product} />
            <CatalogCardInfo product={product} />
          </div>
        )}
      </div>

      <Footer isMobile={isMobile} />
    </div>
  );
};
