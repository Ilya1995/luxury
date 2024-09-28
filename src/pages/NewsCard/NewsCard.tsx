import { FC, useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Parser } from 'html-to-react';
import { Animate } from 'react-simple-animate';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Mousewheel, Navigation } from 'swiper/modules';

import { SwiperNav } from './SwiperNav';
import { useMedia } from '../../hooks';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Card } from '../../components/News/Card';
import { type News, ResponseOne, Response } from '../../store/types';
import { baseURL } from '../..';

import './styles.scss';

export const NewsCard: FC = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activePhoto, setActivePhoto] = useState<number>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [news, setNews] = useState<News>();
  const [otherNews, setOtherNews] = useState<News[]>();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [showNavButton, setShowNavButton] = useState({
    showPrev: false,
    showNext: false,
  });

  const isMobile = useMedia('(max-width: 768px)');

  const handleChangeShowNawButtons = ({
    isBeginning,
    isEnd,
    activeIndex,
  }: SwiperClass) => {
    setActiveIndex(activeIndex);
    setShowNavButton({ showPrev: !isBeginning, showNext: !isEnd });
  };

  const getNewsById = useCallback(async () => {
    try {
      const url = `/news/${newsId}`;
      const response: ResponseOne<News> = await axios.get(url);
      if (response.status !== 200 || typeof response.data === 'string') {
        throw new Error('bad response');
      }

      setNews(response.data);
      if (response.data.imageIds?.length) {
        setActivePhoto(response.data.imageIds[0]);
        setShowNavButton({
          showPrev: false,
          showNext: (response.data.imageIds.length ?? 0) > 4,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [newsId]);

  const getOtherNews = useCallback(async () => {
    try {
      const response: Response<News[]> = await axios.get('/news?size=3');
      if (response.status !== 200 || typeof response.data === 'string') {
        throw new Error('bad response');
      }

      if (newsId) {
        setOtherNews(
          response.data.content
            .filter(({ id }) => id !== Number(newsId))
            .slice(0, 2)
        );
      }
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
    getOtherNews();
  }, [newsId, navigate, getNewsById, getOtherNews]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const callback = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);

  const showMask = (direction: 'left' | 'right', index: number) => {
    if (direction === 'right') {
      return Boolean(
        index > activeIndex + 2 && (news?.imageIds?.length ?? 0) - 1 !== index
      );
    }

    if (direction === 'left') {
      return Boolean(activeIndex === index && activeIndex);
    }

    return false;
  };

  const widthLine = (innerWidth - 32) / (news?.imageIds?.length ?? 1);
  const showBreadcrumbs = !isMobile;
  const showPhotoDesk = !isMobile;
  const showPhotoMobile = isMobile;
  const showAnotherNews = isMobile;
  const showScroll = (news?.imageIds?.length ?? 0) > 1;
  const showSlider = !!news?.imageIds?.length && news.imageIds?.length > 1;

  return (
    <div className="news-card">
      <Header className="news-card__header" isMobile={isMobile} />

      {!!news && (
        <div className="news-card__content">
          {showBreadcrumbs && <Breadcrumbs news={news} />}

          {showPhotoMobile && (
            <>
              {showSlider && (
                <div className="news-card-mobile__slider">
                  <Swiper
                    slidesPerView={1}
                    speed={800}
                    slidesOffsetBefore={16}
                    slidesOffsetAfter={-16}
                    onActiveIndexChange={handleChangeShowNawButtons}
                    mousewheel
                    modules={[Mousewheel, Navigation]}
                  >
                    {news.imageIds?.map((photo) => (
                      <SwiperSlide key={photo}>
                        <img
                          className={classNames('news-card-mobile__img')}
                          src={`${baseURL}/images/${photo}`}
                          onClick={() => setActivePhoto(photo)}
                          alt="furniture"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}

              {!showSlider && news.imageIds?.[0] && (
                <div className="flex-center">
                  <img
                    className={classNames('news-card-mobile__img')}
                    src={`${baseURL}/images/${news.imageIds[0]}`}
                    alt="furniture"
                  />
                </div>
              )}
              {showScroll && (
                <div className="news-card-mobile__scroll">
                  <div
                    className="news-card-mobile__scroll-item"
                    style={{
                      width: `${widthLine}px`,
                      transform: `translateX(${activeIndex * widthLine}px)`,
                    }}
                  />
                </div>
              )}
            </>
          )}

          <div className="news-card__titles">
            <div className="news-card__title">{news.titleRu}</div>
            <div className="news-card__subtitle">
              {dayjs(news.newsDate).format('D MMMM YYYY')}
            </div>
          </div>

          {showPhotoDesk && activePhoto && (
            <div className="news-card__photo">
              {activePhoto && (
                <div className="news-card__photo-wrapper-img">
                  <Animate
                    play
                    key={activePhoto}
                    start={{ opacity: 0.6 }}
                    end={{ opacity: 1 }}
                    duration={0.3}
                    easeType="ease-in"
                  >
                    <img
                      className="news-card__photo-img"
                      src={`${baseURL}/images/${activePhoto}`}
                      alt="card"
                    />
                  </Animate>
                </div>
              )}
              {!!news.imageIds?.length && news.imageIds?.length > 1 && (
                <div className="news-card__photo-carousel">
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={16}
                    speed={800}
                    onActiveIndexChange={handleChangeShowNawButtons}
                    wrapperClass="news-card__photo-carousel-wrapper"
                    mousewheel={news.imageIds.length > 4}
                    modules={[Mousewheel, Navigation]}
                  >
                    {news.imageIds.map((item, index) => (
                      <SwiperSlide key={item}>
                        <img
                          className={classNames(
                            'news-card__photo-carousel-img',
                            {
                              'news-card__photo-carousel-img_active':
                                item === activePhoto,
                            }
                          )}
                          src={`${baseURL}/images/${item}`}
                          onClick={() => setActivePhoto(item)}
                          alt="furniture"
                        />
                        {showMask('right', index) && (
                          <div
                            className="mask mask_right"
                            onClick={() => setActivePhoto(item)}
                          />
                        )}
                        {showMask('left', index) && (
                          <div
                            className="mask mask_left"
                            onClick={() => setActivePhoto(item)}
                          />
                        )}
                      </SwiperSlide>
                    ))}
                    {showNavButton.showPrev && (
                      <>
                        <SwiperNav nav="prev" />
                        <div className="news-card__photo-carousel-arrow-bg -prev" />
                      </>
                    )}
                    {showNavButton.showNext && (
                      <>
                        <SwiperNav nav="next" />
                        <div className="news-card__photo-carousel-arrow-bg -next" />
                      </>
                    )}
                  </Swiper>
                </div>
              )}
            </div>
          )}

          <div className="news-card__description">
            {Parser().parse(news.descriptionRus)}
          </div>

          {showAnotherNews && (
            <div className="news-card__another">
              <div className="news-card__another-title">{t('other-news')}</div>

              {!!otherNews?.length && (
                <div className="news-card__another-items">
                  {otherNews.map((item) => (
                    <Card
                      className="news-card__another-items-card"
                      key={item.id}
                      {...item}
                      onClickCard={() => navigate(`/news/${item.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <Footer isMobile={isMobile} />
    </div>
  );
};
