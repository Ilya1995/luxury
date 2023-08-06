import { FC, useState, ChangeEvent } from 'react';
import classNames from 'classnames';

import { textForMobile, textForDesc } from './constants';

import './styles.scss';

type PropsType = {
  isMobile: boolean;
};

export const Subscription: FC<PropsType> = ({ isMobile }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const text = isMobile ? textForMobile : textForDesc;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.trim());
    setIsValid(true);
  };

  const handleSendEmail = () => {
    const EMAIL_REGEXP =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const isValid = EMAIL_REGEXP.test(email);
    setIsValid(isValid);
    console.log(isValid);
  };

  return (
    <div className="subscription">
      <div className="subscription__content">
        <div className="subscription__header">Хотите быть в курсе трендов?</div>
        <div className="subscription__text">{text}</div>
        <div className="subscription__controls">
          <div>
            <input
              className={classNames('input subscription__controls-email', {
                'subscription__controls-email_invalid': !isValid,
              })}
              value={email}
              onChange={handleChange}
              placeholder="E-mail"
            />
            <div className="email-error">Введите корректный email</div>
          </div>

          <button className="button shadow" onClick={handleSendEmail}>
            Подписаться
          </button>
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
