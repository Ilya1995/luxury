import { FC } from 'react';
import classNames from 'classnames';

import './styles.scss';

type PropsType = {
  className?: string;
};

export const Header: FC<PropsType> = ({ className }) => {
  return (
    <div className={classNames('header', className)}>
      <img alt="Лого" src="./logo.svg" />
      <div className="header__nav-menu">
        <div className="nav-link">Каталог</div>
        <div className="nav-link">Бренды</div>
        <div className="nav-link">Проекты</div>
        <div className="nav-link">Новости</div>
        <div className="nav-link">Контакты</div>
        <img className="nav-link" alt="Поиск" src="./search.svg" />
      </div>
    </div>
  );
};
