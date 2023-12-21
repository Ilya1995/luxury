import { FC } from 'react';
import classNames from 'classnames';

import { TabType } from '../../types';

import './styles.scss';
import { Icon } from '../ui/Icon';

type PropsType = {
  item: TabType;
  isActive?: boolean;
  hasClose?: boolean;
  onClick?: (value: TabType) => void;
  onClose?: (value: TabType) => void;
};

export const Tab: FC<PropsType> = ({
  item,
  isActive = false,
  hasClose = false,
  onClick = () => {},
  onClose = () => {},
}) => (
  <div
    className={classNames('tab', { tab_active: isActive })}
    onClick={() => onClick(item)}
  >
    {item.label}
    {hasClose && (
      <Icon
        name="close2"
        color="rgba(var(--grey-400))"
        handleClick={() => onClose(item)}
        size={1.5}
      />
    )}
  </div>
);
