import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  YMaps,
  Map,
  GeolocationControl,
  TrafficControl,
  Placemark,
} from 'react-yandex-maps';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useMedia } from '../../hooks';

import './styles.scss';

export const Contacts: FC = () => {
  const isMobile = useMedia('(max-width: 768px)');
  const { t } = useTranslation();

  const showBreadcrumbs = !isMobile;
  const heightMap = isMobile ? '280px' : '300px';
  const widthMap = isMobile
    ? 'calc(100vw - 2rem)'
    : 'calc((100vw - 13.75rem) / 2)';

  return (
    <div className="contacts-page">
      <Header className="contacts-page__header" isMobile={isMobile} />

      <div className="contacts-page__content">
        {showBreadcrumbs && <Breadcrumbs />}
        <div className="contacts-page__title">{t('contacts')}</div>
        <div className="contacts-page__blocks">
          <div className="contacts-page__blocks-item">
            <div className="contacts-page-info">
              <div className="contacts-page-info__text">
                <div className="contacts-page-info__text-title">Адрес</div>
                <div className="contacts-page-info__text-content">
                  Luxury Living
                </div>
                <div className="contacts-page-info__text-content">
                  г. Краснодар, ул. Аэродромная, 33
                </div>
              </div>
              <div className="contacts-page-info__text">
                <div className="contacts-page-info__text-title">
                  Часы работы
                </div>
                <div className="contacts-page-info__text-content">
                  пн-сб 10:00 – 19:00
                </div>
                <div className="contacts-page-info__text-content">
                  вс 11:00 – 19:00
                </div>
              </div>
              <div className="contacts-page-info__text">
                <div className="contacts-page-info__text-title">Телефоны</div>
                <div className="contacts-page-info__text-content">
                  +7 (861) 222-22-23
                </div>
                <div className="contacts-page-info__text-content">
                  +7 (989) 235-19-33
                  <span className="contacts-page-info__social">
                    (
                    <a
                      href="https://wa.me/79892351933"
                      rel="noreferrer"
                      target="_blank"
                    >
                      WhatsApp
                    </a>
                    &nbsp;и&nbsp;
                    <a
                      href="tg://resolve?domain=79892351933"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Telegram
                    </a>
                    )
                  </span>
                </div>
              </div>
            </div>
            <div className="contacts-page-map">
              <YMaps>
                <Map
                  height={heightMap}
                  width={widthMap}
                  defaultState={{
                    center: [45.047856, 38.969169],
                    zoom: 18,
                    controls: ['zoomControl', 'fullscreenControl'],
                  }}
                  modules={['control.ZoomControl', 'control.FullscreenControl']}
                >
                  <GeolocationControl
                    options={{
                      float: 'right',
                    }}
                  />
                  <TrafficControl
                    options={{
                      float: 'right',
                    }}
                  />
                  <Placemark
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: '/store.webp',
                      iconImageSize: [50, 58],
                      iconImageOffset: [-15, -42],
                    }}
                    geometry={[45.047856, 38.969169]}
                  />
                </Map>
              </YMaps>
            </div>
          </div>
          <div className="contacts-page__blocks-item">
            <div className="contacts-page-info contacts-page-info_gap">
              <div className="contacts-page-info__text">
                <div className="contacts-page-info__text-title">Адрес</div>
                <div className="contacts-page-info__text-content">Vendôme</div>
                <div className="contacts-page-info__text-content">
                  г. Сочи, микрорайон Центральный, ул. Войкова, 1/1
                </div>
              </div>
              <div className="contacts-page-info__text">
                <div className="contacts-page-info__text-title">
                  Часы работы
                </div>
                <div className="contacts-page-info__text-content">
                  пн-вс 10:00 – 20:00
                </div>
              </div>
              <div className="contacts-page-info__text">
                <div className="contacts-page-info__text-title">Телефоны</div>
                <div className="contacts-page-info__text-content">
                  +7 (961) 313-33-33
                </div>
              </div>
            </div>
            <div className="contacts-page-map">
              <YMaps>
                <Map
                  height={heightMap}
                  width={widthMap}
                  defaultState={{
                    center: [43.58056, 39.71949],
                    zoom: 18,
                    controls: ['zoomControl', 'fullscreenControl'],
                  }}
                  modules={['control.ZoomControl', 'control.FullscreenControl']}
                >
                  <GeolocationControl
                    options={{
                      float: 'right',
                    }}
                  />
                  <TrafficControl
                    options={{
                      float: 'right',
                    }}
                  />
                  <Placemark
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: '/store.webp',
                      iconImageSize: [50, 58],
                      iconImageOffset: [-15, -42],
                    }}
                    geometry={[43.58055, 39.71965]}
                  />
                </Map>
              </YMaps>
            </div>
          </div>
        </div>
      </div>

      <Footer isMobile={isMobile} />
    </div>
  );
};
