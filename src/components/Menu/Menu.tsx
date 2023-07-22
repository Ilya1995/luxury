import { FC, useState, useRef } from 'react';
import classNames from 'classnames';

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

  useOnClickOutside(node, () => {
    if (isOpen) {
      onChangeIsMenuOpen();
    }
  });

  const onChangeIsMenuOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onChangeHash = (href: AnchorPageEnum) => {
    window.location.href = '#' + href;
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
          О нас
        </div>
        <div
          className="menu__side-link"
          onClick={() => onChangeHash(AnchorPageEnum.APPLICATION)}
        >
          Применение
        </div>
        <div
          className="menu__side-link"
          onClick={() => onChangeHash(AnchorPageEnum.TECHNOLOGY)}
        >
          Технология
        </div>
        <div
          className="menu__side-link"
          onClick={() => onChangeHash(AnchorPageEnum.CONTACTS)}
        >
          Контакты
        </div>
      </div>
    </div>
  );
};
