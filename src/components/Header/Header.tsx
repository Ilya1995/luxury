import { FC } from 'react';
import classNames from 'classnames';

import { Menu } from '../Menu';
import { LangMenu } from '../LangMenu';

import './styles.scss';

type PropsType = {
  isMobile: boolean;
  className?: string;
};

export const Header: FC<PropsType> = ({ isMobile, className }) => {
  return (
    <div className={classNames('header', className)}>
      {isMobile && <Menu handleChangePage={() => {}} anchorMapToPage={{}} />}
      <img alt="Лого" src="./logo.svg" />
      {isMobile && <img alt="Поиск" src="./search.svg" />}
      {!isMobile && (
        <div className="header__nav-menu">
          <LangMenu />
          <div className="nav-link">Каталог</div>
          <div className="nav-link">Бренды</div>
          <div className="nav-link">Проекты</div>
          <div className="nav-link">Новости</div>
          <div className="nav-link">Контакты</div>
          <img
            className="nav-link header__search"
            alt="Поиск"
            src="./search.svg"
          />
        </div>
      )}
    </div>
  );
};
