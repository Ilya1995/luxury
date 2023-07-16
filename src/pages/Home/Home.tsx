import { FC } from 'react';

import { Header } from '../../components/Header';
import { BrandsCarousel } from '../../components/BrandsCarousel';

import './styles.scss';

type PropsType = {};

const text =
  'Интерьерный салон Luxury Living работает с 2010 года и является официальным представителем на юге России\nвсемирно известных брендов: Hermes, Baccarat, Lalique, Christofle, Daum, Fendi Casa, Dolce&Gabbana Casa, Versace Home и др.\nОпытные декораторы осуществляют под ключ полный спектр услуг от подбора материалов до оформления интерьера мебелью, предметами столовой сервировки, текстилем и аксессуарами';

export const Home: FC<PropsType> = () => {
  return (
    <div className="page home-page">
      <div className="bg">
        <Header className="home-page__header" />
        <div className="home-page__tagline">Лучшее для вашего интерьера</div>
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
    </div>
  );
};
