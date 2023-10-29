import { FC } from 'react';
import { Animate } from 'react-simple-animate';
import { useTranslation } from 'react-i18next';

import { useMedia } from '../../hooks';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import './styles.scss';

type PropsType = {};

export const Catalog: FC<PropsType> = () => {
  const { t } = useTranslation();
  const isMobile = useMedia('(max-width: 768px)');

  return (
    <div className="page catalog-page">
      <Header className="catalog-page__header" isMobile={isMobile} />

      <Footer isMobile={isMobile} />
    </div>
  );
};
