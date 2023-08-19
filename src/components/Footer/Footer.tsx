import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import './styles.scss';

type PropsType = {
  isMobile: boolean;
};

export const Footer: FC<PropsType> = ({ isMobile }) => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="footer__first">
        <img className="footer__logo" alt="Лого" src="./logo-visit.svg" />
        <div className="footer__contacts">
          <div className="footer-links-group">
            <div className="footer__contacts-links">
              <div className="pointer">{t('catalog')}</div>
              <div className="pointer">{t('brands')}</div>
              <div className="pointer">{t('projects')}</div>
            </div>
            <div className="footer__contacts-links">
              <div className="pointer">{t('news')}</div>
              <div className="pointer">{t('contacts')}</div>
            </div>
          </div>
          {!isMobile && (
            <div className="footer__contacts-social">
              <a href="https://dzen.ru/" rel="noreferrer" target="_blank">
                <img alt="instagram" src="./instagram.svg" />
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
            <div className="pointer">{t('return-policy')}</div>
            <div className="pointer">{t('personal-data')}</div>
            <div className="pointer">Cookies</div>
          </div>
        </div>
      </div>
    </div>
  );
};
