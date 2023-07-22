import { FC, useEffect, useState } from 'react';
import { Animate } from 'react-simple-animate';

import { Header } from '../../components/Header';
import { BrandsCarousel } from '../../components/BrandsCarousel';
import { Subscription } from '../../components/Subscription';
import { FAQ } from '../../components/FAQ';
import { Footer } from '../../components/Footer';

import './styles.scss';

type PropsType = {};

const text =
  'Интерьерный салон Luxury Living работает с 2010 года и является официальным представителем на юге России\nвсемирно известных брендов: Hermes, Baccarat, Lalique, Christofle, Daum, Fendi Casa, Dolce&Gabbana Casa, Versace Home и др.\nОпытные декораторы осуществляют под ключ полный спектр услуг от подбора материалов до оформления интерьера мебелью, предметами столовой сервировки, текстилем и аксессуарами';

export const Home: FC<PropsType> = () => {
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

  return (
    <div className="page home-page">
      <div className="bg" style={{ height: `${innerWidth / 2 - 30}px` }}>
        <Header className="home-page__header" />
        <div
          className="home-page__tagline"
          style={{ marginTop: `${(innerWidth / 2 - 30) / 3.7}px` }}
        >
          <Animate
            play
            start={{ opacity: 0 }}
            end={{ opacity: 1 }}
            easeType="ease-in"
            duration={1.5}
          >
            Лучшее для вашего интерьера
          </Animate>
        </div>
      </div>
      <div className="home-page__business-inf business-inf">
        <img alt="Лого" src="./logo-visit.svg" />
        <div className="business-inf__text">{text}</div>
        <div className="business-inf__more">
          <div>Подробнее</div>
          <img
            className="business-inf__more-icon"
            alt="Направо"
            src="./arrow-right.svg"
          />
        </div>
      </div>
      <BrandsCarousel />
      <Subscription />
      <FAQ />
      <Footer />
    </div>
  );
};
