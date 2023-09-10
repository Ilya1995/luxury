import { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

import { ButtonMore } from '../../components/ButtonMore';

import './styles.scss';

type PropsType = {
  id: number;
  imageId: number;
  title: string;
  newsDate: string;
};

export const Card: FC<PropsType> = ({ imageId, title, newsDate }) => {
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
          <div className="card__content-title">{title}</div>
        </div>
        <ButtonMore />
      </div>
    </div>
  );
};
