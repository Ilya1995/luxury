import { FC } from 'react';
import classNames from 'classnames';

import './styles.scss';

type PropsType = {
  label: string;
  isActive?: boolean;
  onClick: (value: string) => void;
};

export const Tab: FC<PropsType> = ({ label, isActive = false, onClick }) => (
  <div
    className={classNames('tab', { tab_active: isActive })}
    onClick={() => onClick(label)}
  >
    {label}
  </div>
);
