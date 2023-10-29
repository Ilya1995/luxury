import { FC, useState } from 'react';
import classNames from 'classnames';

import { langs } from './constants';

import './styles.scss';

type PropsType = {
  className?: string;
};

export const LangMenu: FC<PropsType> = ({ className }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'RUS');

  const changeLang = () => {
    const newLang = lang === 'RUS' ? 'ENG' : 'RUS';

    localStorage.setItem('lang', newLang);
    setLang(newLang);
    window.location.reload();
  };

  return (
    <div onClick={changeLang} className={classNames('lang-menu', className)}>
      <div>{langs[lang]}</div>
    </div>
  );
};
