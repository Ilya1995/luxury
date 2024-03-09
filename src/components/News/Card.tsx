import { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

import { ButtonMore } from '../ui/ButtonMore';

import './styles.scss';

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
  const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    load();
  }, [imageId]);

  const load = async () => {
    if (!imageId) return;

    const config: any = {
      url: 'images/' + imageId,
      method: 'get',
      responseType: 'blob',
    };
    const response = await axios.request(config);
    setImgSrc(response.data);
  };

  return (
    <div className="card">
      {imgSrc && (
        <img
          className="card__img"
          alt="news"
          src={URL.createObjectURL(imgSrc)}
        />
      )}
      <div className="card__content">
        <div>
          <div className="card__content-date">
            {dayjs(newsDate).format('D MMMM YYYY')}
          </div>
          <div className="card__content-title">{descriptionRus}</div>
        </div>
        <ButtonMore />
      </div>
    </div>
  );
};
