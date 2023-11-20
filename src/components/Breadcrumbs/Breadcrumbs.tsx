import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { useMatches } from 'react-router-dom';

import { Icon } from '../Icon';

import './styles.scss';

type PropsType = {
  className?: string;
};

const MAP: Record<string, string> = {
  '/catalog': 'Каталог',
};

export const Breadcrumbs: FC<PropsType> = ({ className }) => {
  const matches = useMatches();

  const items = useMemo(() => {
    const result = [{ label: 'Главная', path: '/' }];

    matches.forEach((item) => {
      result.push({ label: MAP[item.pathname], path: item.pathname });
    });

    return result;
  }, [matches]);

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
