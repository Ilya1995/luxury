import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Product } from '../../types';
import { Icon } from '../ui/Icon';

import './styles.scss';

type PropsType = {
  product?: Product;
  className?: string;
};

const MAP: Record<string, any> = {
  catalog: 'Каталог',
  present: 'Подарки',
  serving: 'Сервировка',
  accessories: 'Аксессуары',
  textile: 'Текстиль',
  carpets: 'Ковры',
  wallpaper: 'Обои',
  paints: 'Краски',
  furniture: 'Мебель',
  contacts: 'Контакты',
};

export const Breadcrumbs: FC<PropsType> = ({ className, product }) => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    if (path === pathname) return;

    navigate(path);
  };

  const items = useMemo(() => {
    const names = pathname.split('/').slice(1);
    const result = [{ label: 'Главная', path: '/' }];

    names.forEach((item, index) => {
      if (item === 'all') return;
      const path = '/' + names.slice(0, index + 1).join('/');

      if (product && item === productId) {
        const label = `${product.brand?.title} ${product.title}`;
        result.push({ label, path });
        return;
      }

      result.push({ label: MAP[item], path });
    });

    return result;
  }, [pathname, product, productId]);

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
