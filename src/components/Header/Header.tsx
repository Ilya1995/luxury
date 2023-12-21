import { FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate, NavLink } from 'react-router-dom';

import { Menu } from '../Menu';
import { LangMenu } from '../LangMenu';
import { Icon } from '../ui/Icon';
import { Search } from '../Search';

import './styles.scss';

type PropsType = {
  isMobile: boolean;
  className?: string;
  isWhite?: boolean;
};

export const Header: FC<PropsType> = ({
  isMobile,
  className,
  isWhite = false,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={classNames('header', { header_white: isWhite }, className)}>
      {isMobile && (
        <Menu
          handleChangePage={() => {}}
          anchorMapToPage={{}}
          isWhite={isWhite}
        />
      )}

      <Icon
        name="logo"
        width={isMobile ? 8.55 : 10.6875}
        height={isMobile ? 2 : 2.5625}
        color={isWhite ? 'rgba(var(--white))' : 'rgba(var(--grey-800))'}
        pointer
        handleClick={() => navigate('/')}
      />

      {isMobile && (
        <Icon
          name="search"
          size={1.5}
          color={isWhite ? 'rgba(var(--white))' : 'rgba(var(--grey-800))'}
        />
      )}
      {!isMobile && (
        <div className="header__nav-menu">
          <NavLink className="nav-link" to="/catalog">
            {t('catalog')}
          </NavLink>
          <div className="nav-link">{t('brands')}</div>
          <div className="nav-link">{t('projects')}</div>
          <div className="nav-link">{t('news')}</div>
          <div className="nav-link">{t('contacts')}</div>
          <Search isWhite={isWhite} />
          <LangMenu className="header__lang-menu" isWhite={isWhite} />
        </div>
      )}
    </div>
  );
};
