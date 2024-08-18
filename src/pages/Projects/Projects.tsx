import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { Response } from '../../store/types';
import { useMedia } from '../../hooks';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Icon } from '../../components/ui/Icon';

import './styles.scss';

export const Projects: FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);

  const isMobile = useMedia('(max-width: 768px)');

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const url = '/projects';
      const response: Response<any> = await axios.get(url);
      if (response.status !== 200 || typeof response.data === 'string') {
        throw new Error('bad response');
      }

      setProjects(response.data.content);
    } catch (error) {
      console.error(error);
      setProjects([]);
    }
  };

  const handleMore = () => {};

  const showBreadcrumbs = !isMobile;

  return (
    <div className="projects-page">
      <Header className="projects-page__header" isMobile={isMobile} />

      <div className="projects-page__content">
        {showBreadcrumbs && <Breadcrumbs />}

        <div className="projects-page__title">{t('projects')}</div>

        <div className="projects-page__content-main">
          <div className="projects-page__content-main-info">
            <div className="projects-page__content-main-title">
              {t('apartment-decor')}
            </div>
            <div className="projects-page__content-main-description">
              {t('apartment-decor-description')}
            </div>
            <button
              className="projects-page-button button"
              onClick={handleMore}
            >
              {t('more')}
              <Icon
                className="projects-page-button__icon"
                name="arrow-right"
                color="rgba(var(--white-400))"
                height={0.8875}
                width={1}
              />
            </button>
          </div>
          <img src="/decor.jpg" alt="apartment-decor" />
        </div>
      </div>

      <Footer isMobile={isMobile} />
    </div>
  );
};
