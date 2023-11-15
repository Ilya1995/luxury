import { FC, useState } from 'react';

import { useMedia } from '../../hooks';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Tab } from '../../components/Tab';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { tabs } from './constants';

import './styles.scss';

type PropsType = {};

export const Catalog: FC<PropsType> = () => {
  const isMobile = useMedia('(max-width: 768px)');
  const [activeTab, setActiveTab] = useState('');

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
              onClick={setActiveTab}
            />
          ))}
        </div>
        <Breadcrumbs />
      </div>

      <Footer isMobile={isMobile} />
    </div>
  );
};
