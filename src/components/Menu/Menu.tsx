import { FC, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useOnClickOutside } from '../../hooks';
// import { AnchorMapToPageType } from '../../types';

import './styles.scss';
// import { AnchorPageEnum } from '../../constants';

type PropsType = {
  handleChangePage: (index: number) => void;
  anchorMapToPage: any;
  //   anchorMapToPage: AnchorMapToPageType;
};

export enum AnchorPageEnum {
  ACQUAINTANCE = 'acquaintance',
  APPLICATION = 'application',
  TECHNOLOGY = 'technology',
  INFORMATION = 'information',
  CONTACTS = 'contacts',
}

export const Menu: FC<PropsType> = ({ handleChangePage, anchorMapToPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const listener = () => {
      isOpen && setIsOpen(false);
    };

    document.addEventListener('touchmove', listener);

    return () => {
      document.removeEventListener('touchmove', listener);
    };
  }, [isOpen]);

  useOnClickOutside(node, () => {
    if (isOpen) {
      onChangeIsMenuOpen();
    }
  });

  const onChangeIsMenuOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onChangeHash = (href: AnchorPageEnum) => {
    // window.location.href = '#' + href;
    handleChangePage(anchorMapToPage[href]);
  };

  return (
    <div className="menu" ref={node}>
      <button
        className={classNames('menu__button', {
          menu__button_active: isOpen,
        })}
        onClick={onChangeIsMenuOpen}
      >
        <span className="menu__button-item" />
        <span className="menu__button-item" />
        <span className="menu__button-item" />
      </button>
      <div
        className={classNames('menu__side', {
          menu__side_open: isOpen,
        })}
      >
        <div
          className="menu__side-link"
          onClick={() => onChangeHash(AnchorPageEnum.ACQUAINTANCE)}
        >
          {t('catalog')}
        </div>
        <div
          className="menu__side-link"
          onClick={() => onChangeHash(AnchorPageEnum.APPLICATION)}
        >
          {t('brands')}
        </div>
        <div
          className="menu__side-link"
          onClick={() => onChangeHash(AnchorPageEnum.TECHNOLOGY)}
        >
          {t('projects')}
        </div>
        <div
          className="menu__side-link"
          onClick={() => onChangeHash(AnchorPageEnum.CONTACTS)}
        >
          {t('news')}
        </div>
        <div
          className="menu__side-link"
          onClick={() => onChangeHash(AnchorPageEnum.CONTACTS)}
        >
          {t('contacts')}
        </div>
      </div>
    </div>
  );
};
