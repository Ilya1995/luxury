import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { Icon } from '../Icon';

import './styles.scss';

type PropsType = {
  className?: string;
};

const MAP: Record<string, any> = {
  catalog: { label: 'Каталог', path: '/catalog' },
  present: { label: 'Подарки', path: '/catalog/present' },
  serving: { label: 'Сервировка', path: '/catalog/serving' },
  accessories: { label: 'Аксессуары', path: '/catalog/accessories' },
  textile: { label: 'Текстиль', path: '/catalog/textile' },
  carpets: { label: 'Ковры', path: '/catalog/carpets' },
  wallpaper: { label: 'Обои', path: '/catalog/wallpaper' },
  paints: { label: 'Краски', path: '/catalog/paints' },
  furniture: { label: 'Мебель', path: '/catalog/furniture' },
};

export const Breadcrumbs: FC<PropsType> = ({ className }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    if (path === pathname) return;

    navigate(path);
  };

  const items = useMemo(() => {
    const names = pathname.split('/').slice(1);

    const result = [{ label: 'Главная', path: '/' }];

    names.forEach((item) => {
      result.push({ label: MAP[item].label, path: MAP[item].path });
    });

    return result;
  }, [pathname]);

  return (
    <div className={classNames('breadcrumbs', className)}>
      {items.map((item, index) => {
        const isLast = items.length - 1 === index;
        return (
          <div key={item.label} className="breadcrumbs-items">
            <div
              className={classNames('breadcrumbs__item', {
                breadcrumbs__item_active: isLast,
              })}
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </div>
            {!isLast && (
              <Icon
                className="breadcrumbs-icon"
                name="arrow-right2"
                color="rgba(var(--grey-400))"
                height={0.625}
                width={0.3125}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
