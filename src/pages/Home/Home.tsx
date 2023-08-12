import { FC, useEffect, useState } from 'react';
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
import { ButtonMore } from '../../components/ButtonMore';

import './styles.scss';

type PropsType = {};

export const Home: FC<PropsType> = () => {
  const { t } = useTranslation();
  const isMobile = useMedia('(max-width: 768px)');
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const callback = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);

  const heightBG = innerWidth / 2 - 30;
  const styleBG = !isMobile ? { height: `${heightBG}px` } : {};
  const styleTagline = !isMobile ? { marginTop: `${heightBG / 3.7}px` } : {};

  return (
    <div className="page home-page">
      <div className="bg" style={styleBG}>
        <Header className="home-page__header" isMobile={isMobile} />
        <div className="home-page__tagline" style={styleTagline}>
          <Animate
            play
            start={{ opacity: 0 }}
            end={{ opacity: 1 }}
            easeType="ease-in"
            duration={1.5}
          >
            {t(isMobile ? 'tagline-mobile' : 'tagline')}
          </Animate>
        </div>
      </div>
      <div className="home-page__business-inf business-inf">
        <img className="business-inf__logo" alt="Лого" src="./logo-visit.svg" />
        <div className="business-inf__text">{t('business-inf')}</div>
        <ButtonMore />
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
