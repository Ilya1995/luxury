import { FC } from 'react';

import { Lang } from '../../store/types';

type PropsType = {};

export const LangMenu: FC<PropsType> = () => {
  const changeLang = (lang: Lang) => {
    if (localStorage.getItem('lang') === lang) return;

    localStorage.setItem('lang', lang);
    window.location.reload();
  };

  return (
    <div className="lang-menu">
      <div onClick={() => changeLang('RUS')}>RUS</div>
      <div onClick={() => changeLang('ENG')}>ENG</div>
    </div>
  );
};
