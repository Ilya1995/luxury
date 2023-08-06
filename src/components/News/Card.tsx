import { FC } from 'react';
import dayjs from 'dayjs';

import { ButtonMore } from '../../components/ButtonMore';

import './styles.scss';

type PropsType = {
  id: number;
  pictureUrl: string;
  description: string;
  date: string;
};

export const Card: FC<PropsType> = ({ pictureUrl, description, date }) => {
  return (
    <div className="card">
      <img className="card__img" alt="news" src={pictureUrl} />
      <div className="card__content">
        <div>
          <div className="card__content-date">
            {dayjs(date).format('D MMMM YYYY')}
          </div>
          <div className="card__content-title">{description}</div>
        </div>
        <ButtonMore />
      </div>
    </div>
  );
};
