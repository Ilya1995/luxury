import { FC } from 'react';

import './styles.scss';

type PropsType = {};

export const Catalogg: FC<PropsType> = () => {
  return (
    <div className="catalog">
      <div className="catalog__header">Каталог</div>
      <div className="catalog__content">
        <div className="catalog-img catalog__content-serving">Сервировка</div>
        <div className="catalog-img catalog__content-curtains">Шторы</div>
        <div className="catalog-img catalog__content-furniture">Мебель</div>
        <div className="catalog-img catalog__content-accessories">
          Аксессуары
        </div>
      </div>
    </div>
  );
};
