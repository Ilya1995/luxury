import { FC } from 'react';

import './styles.scss';

type PropsType = {};

const text =
  'Узнавайте первыми обо всех новинках и распродажах \nв нашей рассылке. Обещаем писать нечасто и только по делу';

export const Subscription: FC<PropsType> = () => {
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
          <button className="button">Подписаться</button>
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
      <img alt="фон" src="./bg-sub.jpg" />
    </div>
  );
};
