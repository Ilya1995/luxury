import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';

import { useMedia } from '../../hooks';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Tab } from '../../components/Tab';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Filter } from '../../components/Filter';
import { CatalogList } from '../../components/CatalogList';
import { tabs } from './constants';

import './styles.scss';

type PropsType = {};

export const Catalog: FC<PropsType> = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const isMobile = useMedia('(max-width: 768px)');
  const [activeTab, setActiveTab] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState();

  useEffect(() => {
    getCatalog();
  }, [activeTab, filters]);

  const getCatalog = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleChangeTab = (tab: string) => {
    const newTab = activeTab === tab ? '' : tab;
    // navigate('/catalog/session-timed-out');
    setActiveTab(newTab);
  };

  return (
    <div className="page catalog-page">
      <Header className="catalog-page__header" isMobile={isMobile} />

      <div className="catalog-page__content">
        <div className="catalog-page-tabs">
          {tabs.map(({ label }) => (
            <Tab
              key={label}
              label={label}
              isActive={activeTab === label}
              onClick={handleChangeTab}
            />
          ))}
        </div>
        <Breadcrumbs />
        <div className="catalog-page__title">{t('catalog')}</div>
        <div className="catalog-page-blocks">
          <Filter onChangeFilter={setFilters} />
          <CatalogList isLoading={isLoading} />
        </div>
      </div>

      <Footer isMobile={isMobile} />
    </div>
  );
};
