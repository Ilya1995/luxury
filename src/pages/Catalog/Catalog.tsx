import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useMedia } from '../../hooks';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Checkbox } from '../../components/Checkbox';

import './styles.scss';

type PropsType = {};

export const Catalog: FC<PropsType> = () => {
  const { t } = useTranslation();
  const isMobile = useMedia('(max-width: 768px)');
  const [value, setValue] = useState(false);

  return (
    <div className="page catalog-page">
      <Header className="catalog-page__header" isMobile={isMobile} />
      <Checkbox value={value} onChange={setValue} />

      <Footer isMobile={isMobile} />
    </div>
  );
};
