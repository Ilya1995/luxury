import { FC } from 'react';

import './styles.scss';

type PropsType = {
  isMobile: boolean;
};

export const Footer: FC<PropsType> = ({ isMobile }) => {
  return (
    <div className="footer">
      <div className="footer__first">
        <img className="footer__logo" alt="Лого" src="./logo-visit.svg" />
        <div className="footer__contacts">
          <div className="footer-links-group">
            <div className="footer__contacts-links">
              <div className="pointer">О компании</div>
              <div className="pointer">Каталог</div>
              <div className="pointer">Проекты</div>
            </div>
            <div className="footer__contacts-links">
              <div className="pointer">Новости</div>
              <div className="pointer">Help</div>
              <div className="pointer">Контакты</div>
            </div>
          </div>
          {!isMobile && (
            <div className="footer__contacts-social">
              <a href="https://dzen.ru/" rel="noreferrer" target="_blank">
                <img alt="instagram" src="./instagram.svg" />
              </a>
              <a href="https://dzen.ru/" rel="noreferrer" target="_blank">
                <img alt="vk" src="./vk.svg" />
              </a>
              <a href="https://dzen.ru/" rel="noreferrer" target="_blank">
                <img alt="whatsap" src="./whatsap.svg" />
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="footer__second">
        <div className="line" />
        <div className="footer__information">
          <div>©Luxury Living</div>
          <div className="footer__information-items">
            <div className="pointer">Политика возврата</div>
            <div className="pointer">Обработка персональных данных</div>
            <div className="pointer">Cookies</div>
          </div>
        </div>
      </div>
    </div>
  );
};
