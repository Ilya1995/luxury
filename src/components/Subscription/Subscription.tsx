import { FC } from 'react';

import { textForMobile, textForDesc } from './constants';

import './styles.scss';

type PropsType = {
  isMobile: boolean;
};

export const Subscription: FC<PropsType> = ({ isMobile }) => {
  const text = isMobile ? textForMobile : textForDesc;

  return (
    <div className="subscription">
      <div className="subscription__content">
        <div className="subscription__header">Хотите быть в курсе трендов?</div>
        <div className="subscription__text">{text}</div>
        <div className="subscription__controls">
          <input
            className="input subscription__controls-email"
            placeholder="E-mail"
          />
          <button className="button shadow">Подписаться</button>
        </div>
        <div className="subscription__confidentiality">
          Нажимая на кнопку, вы соглашаетесь с&nbsp;
          <a
            className="subscription__confidentiality-link"
            href="https://dzen.ru/"
            rel="noreferrer"
            target="_blank"
          >
            политикой конфиденциальности
          </a>
        </div>
      </div>
      <div className="subscription__bg" />
    </div>
  );
};
