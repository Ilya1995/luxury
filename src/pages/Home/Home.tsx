import { FC } from 'react';
import { Animate } from 'react-simple-animate';
import { useTranslation } from 'react-i18next';

import { useMedia } from '../../hooks';
import { Header } from '../../components/Header';
import { BrandsCarousel } from '../../components/BrandsCarousel';
import { Catalogg } from '../../components/Catalog';
import { News } from '../../components/News';
import { Subscription } from '../../components/Subscription';
import { FAQ } from '../../components/FAQ';
import { Footer } from '../../components/Footer';

import './styles.scss';

type PropsType = {};

export const Home: FC<PropsType> = () => {
  const { t } = useTranslation();
  const isMobile = useMedia('(max-width: 768px)');

  return (
    <div className="page home-page">
      <div className="bg">
        <Header className="home-page__header" isMobile={isMobile} isWhite />
        <div className="home-page__tagline">
          <Animate
            play
            start={{ opacity: 0 }}
            end={{ opacity: 1 }}
            easeType="ease-in"
            duration={1.5}
          >
            {t('tagline')}
          </Animate>
        </div>
      </div>
      <div className="home-page__business-inf business-inf">
        <img className="business-inf__logo" alt="Лого" src="./logo-visit.svg" />
        <div className="business-inf__content">
          <div className="business-inf__content-text">
            {t('business-inf-1')}
          </div>
          <div className="business-inf__content-text">
            {t('business-inf-2')}
          </div>
        </div>
        <button className="button shadow button_small">{t('more2')}</button>
      </div>
      <BrandsCarousel />
      <Catalogg />
      <News isMobile={isMobile} />
      <Subscription isMobile={isMobile} />
      <FAQ />
      <Footer isMobile={isMobile} />
    </div>
  );
};
