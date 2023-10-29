import { FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Menu } from '../Menu';
import { LangMenu } from '../LangMenu';

import './styles.scss';

type PropsType = {
  isMobile: boolean;
  className?: string;
};

export const Header: FC<PropsType> = ({ isMobile, className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('header', className)}>
      {isMobile && <Menu handleChangePage={() => {}} anchorMapToPage={{}} />}
      <img alt="logo" src="./logo.svg" />
      {isMobile && <img alt="search" src="./search.svg" />}
      {!isMobile && (
        <div className="header__nav-menu">
          <div className="nav-link">{t('catalog')}</div>
          <div className="nav-link">{t('brands')}</div>
          <div className="nav-link">{t('projects')}</div>
          <div className="nav-link">{t('news')}</div>
          <div className="nav-link">{t('contacts')}</div>
          <img
            className="nav-link header__search"
            alt="search"
            src="./search.svg"
          />
          <LangMenu className="header__lang-menu" />
        </div>
      )}
    </div>
  );
};
