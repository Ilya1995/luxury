import { FC, useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { Parser } from 'html-to-react';

import { useMedia } from '../../hooks';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { type News, ResponseOne } from '../../store/types';

import './styles.scss';

export const NewsCard: FC = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<News>();

  const isMobile = useMedia('(max-width: 768px)');

  const getNewsById = useCallback(async () => {
    try {
      const url = `/news/${newsId}`;
      const response: ResponseOne<News> = await axios.get(url);
      if (response.status !== 200 || typeof response.data === 'string') {
        throw new Error('bad response');
      }

      setNews(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [newsId]);

  useEffect(() => {
    const isCardNews = Number(newsId) > 0;

    if (!isCardNews || !newsId) {
      navigate('/');
    }

    getNewsById();
  }, [newsId, navigate, getNewsById]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const showBreadcrumbs = !isMobile;

  return (
    <div className="news-card">
      <Header className="news-card__header" isMobile={isMobile} />

      {!!news && (
        <div className="news-card__content">
          {showBreadcrumbs && <Breadcrumbs news={news} />}

          <div className="news-card__title">{news.titleRu}</div>
          <div className="news-card__subtitle">
            {dayjs(news.newsDate).format('D MMMM YYYY')}
          </div>
          <div className="news-card__description">
            {Parser().parse(news.descriptionRus)}
          </div>
        </div>
      )}

      <Footer isMobile={isMobile} />
    </div>
  );
};
