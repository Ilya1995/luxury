import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import './styles.scss';
import axios from 'axios';
import { Brand } from '../../store/types';

type PropsType = {
  id: number;
  src: string;
  name: string;
  brand: Brand | null;
  materials: string | null;
  imageId: number | null;
  title: string;
  onGoToCard: (id: number) => void;
  className?: string;
};

export const CatalogCardPreview: FC<PropsType> = ({
  className,
  id,
  title,
  brand,
  materials,
  imageId,
  onGoToCard,
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

    try {
      const response = await axios.request(config);
      setImgSrc(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={classNames('catalog-card-preview', className)}
      onClick={() => onGoToCard(id)}
    >
      {imgSrc && (
        <img
          className="catalog-card-preview__img"
          src={URL.createObjectURL(imgSrc)}
          alt="card"
        />
      )}
      <div className="catalog-card-preview__content">
        <div className="catalog-card-preview__content-info">
          {brand?.title && (
            <div className="catalog-card-preview__brand">{brand.title}</div>
          )}
          <div className="catalog-card-preview__name">{title}</div>
        </div>

        <div className="catalog-card-preview__content-info">
          <div className="catalog-card-preview__material">
            {materials || 'Фарфор, эмаль'}
          </div>
          <div className="catalog-card-preview__price">Цена по запросу</div>
        </div>
      </div>
    </div>
  );
};
