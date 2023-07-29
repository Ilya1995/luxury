import { FC, useEffect, useState } from 'react';

import { ButtonMore } from '../../components/ButtonMore';

import './styles.scss';

type PropsType = {
  isMobile: boolean;
};

export const LastSlide: FC<PropsType> = ({ isMobile }) => {
  const [height, setHeight] = useState(300);
  const padding = isMobile ? 16 : 32;

  useEffect(() => {
    setTimeout(() => {
      const cards = document.getElementsByClassName('card');
      if (cards.length && cards[0]) {
        setHeight(cards[0].getBoundingClientRect().height);
      }
    }, 2000);
  }, []);

  return (
    <div
      className="last-slide card"
      style={{ height: `${height - padding}px` }}
    >
      <img className="last-slide__img" alt="Лого" src="./logo-visit.svg" />
      <div className="card__content">
        <div className="card__content-title">Все новости компании</div>
        <ButtonMore />
      </div>
    </div>
  );
};
