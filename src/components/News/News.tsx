import { FC, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation } from 'swiper/modules';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-spinner-material';
import { useTranslation } from 'react-i18next';

import { getNews } from '../../store/actionCreator';
import type { RootState } from '../../store';
import { SwiperNavButtonPrev } from '../SwiperNavButtonPrev';
import { SwiperNavButtonNext } from '../SwiperNavButtonNext';
import { Card } from './Card';
import { LastSlide } from './LastSlide';
import { breakpoints } from './constants';

import 'swiper/css';
import 'swiper/css/navigation';
import './styles.scss';

type PropsType = {
  isMobile: boolean;
};

export const News: FC<PropsType> = ({ isMobile }) => {
  const {
    data: news,
    isLoading,
    isError,
  } = useSelector((state: RootState) => state.general.news);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!news.length) {
      getNews(dispatch);
    }
  }, [dispatch, news.length]);

  const offset = isMobile ? 8 : 110;

  if (isError) {
    return;
  }

  if (isLoading) {
    return (
      <Spinner
        radius={50}
        stroke={2}
        color="var(--orange)"
        className="news__spinner"
      />
    );
  }

  return (
    <div className="news">
      <div className="news__header">{t('news')}</div>
      <div className="news__content">
        <Swiper
          slidesPerView={5}
          spaceBetween={24}
          speed={800}
          slidesOffsetBefore={offset}
          slidesOffsetAfter={offset}
          mousewheel
          breakpoints={breakpoints}
          modules={[Mousewheel, Navigation]}
          className="news-swiper"
        >
          {news.map((item) => (
            <SwiperSlide key={item.id}>
              <Card {...item} />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <LastSlide isMobile={isMobile} />
          </SwiperSlide>

          <SwiperNavButtonPrev />
          <SwiperNavButtonNext />
        </Swiper>
      </div>
    </div>
  );
};
