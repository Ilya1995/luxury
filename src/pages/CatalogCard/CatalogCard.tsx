import { FC, useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Tab } from '../../components/Tab';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useMedia } from '../../hooks';
import { TabType } from '../../types';
import { tabs } from '../Catalog/constants';

import './styles.scss';

export const CatalogCard: FC = () => {
  const isMobile = useMedia('(max-width: 768px)');
  const { tab, productId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    const newTab = tabs.find(({ path }) => path === tab);
    return newTab ? newTab : tabs[0];
  }, [tab]);

  useEffect(() => {
    const isCardProduct = Number(pathname.split('/').at(-1)) > 0;

    if (!isCardProduct) {
      navigate('/');
    }
  }, [pathname, navigate]);

  const handleChangeTab = (tab: TabType) => {
    if (tab.path === 'all' || activeTab.label === tab.label) {
      return navigate('/catalog');
    }

    navigate(`/catalog/${tab.path}`);
  };

  return (
    <div className="catalog-card-page">
      <Header className="catalog-card-page__header" isMobile={isMobile} />

      <div className="catalog-card-page__content">
        <div className="catalog-card-page-tabs">
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              item={tab}
              isActive={activeTab.label === tab.label}
              onClick={handleChangeTab}
            />
          ))}
        </div>
        {!isMobile && <Breadcrumbs />}
      </div>

      <Footer isMobile={isMobile} />
    </div>
  );
};
