import { FC } from 'react';
import classNames from 'classnames';

import { Dropdown } from '../Dropdown';

import './styles.scss';

type PropsType = {
  className?: string;
};

const options = ['Вазы и чаши', 'Бокалы', 'Рамки для фото'];

export const Filter: FC<PropsType> = ({ className }) => {
  return (
    <div className={classNames('filter', className)}>
      <Dropdown options={options} />
      <Dropdown options={options} />
    </div>
  );
};
