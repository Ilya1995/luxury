import { FC } from 'react';

import './styles.scss';

export const ButtonMore: FC = () => {
  return (
    <div className="button-more">
      <div>Подробнее</div>
      <img
        className="button-more__icon"
        alt="Направо"
        src="./arrow-right.svg"
      />
    </div>
  );
};
