import { FC } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

import { isOldSafari } from '../../utils/isOldSafari';
import { ButtonMore } from '../ui/ButtonMore';

import './styles.scss';
import { baseURL } from '../..';

type PropsType = {
  id: number;
  imageId: number;
  title: string;
  descriptionRus: string;
  newsDate: string;
};

export const Card: FC<PropsType> = ({
  imageId,
  title,
  descriptionRus,
  newsDate,
}) => {
  return (
    <div className="card">
      {imageId && (
        <img
          className="card__img"
          alt="news"
          src={`${baseURL}/images/${imageId}`}
        />
      )}
      <div className="card__content">
        <div>
          <div className="card__content-date">
            {dayjs(newsDate).format('D MMMM YYYY')}
          </div>
          <div
            className={classNames('card__content-title', {
              'card__content-title_vertical': !isOldSafari(),
            })}
          >
            {descriptionRus}
          </div>
        </div>
        <ButtonMore />
      </div>
    </div>
  );
};
