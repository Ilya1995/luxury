import { FC } from 'react';
import classNames from 'classnames';

import './styles.scss';

type PropsType = {
  name: string;
  color?: string;
  className?: string;
  size?: number;
  height?: number;
  width?: number;
  pointer?: boolean;
  handleClick?: () => void;
};

export const Icon: FC<PropsType> = ({
  name,
  color = 'rgba(var(--white))',
  className,
  size,
  height = 1.125,
  width = 1.125,
  pointer = false,
  handleClick = () => {},
}) => {
  const iconHeight = (size || height) + 'rem';
  const iconWidth = (size || width) + 'rem';
  const cursor = pointer ? 'pointer' : 'default';

  return (
    <i
      className={classNames('icon', className)}
      onClick={handleClick}
      style={{
        WebkitMaskImage: `url('/${name}.svg')`,
        color,
        height: iconHeight,
        width: iconWidth,
        cursor: cursor,
      }}
    />
  );
};
