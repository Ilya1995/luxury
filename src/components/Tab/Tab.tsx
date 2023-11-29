import { FC } from 'react';
import classNames from 'classnames';

import { TabType } from '../../types';

import './styles.scss';

type PropsType = {
  item: TabType;
  isActive?: boolean;
  onClick: (value: TabType) => void;
};

export const Tab: FC<PropsType> = ({ item, isActive = false, onClick }) => (
  <div
    className={classNames('tab', { tab_active: isActive })}
    onClick={() => onClick(item)}
  >
    {item.label}
  </div>
);
