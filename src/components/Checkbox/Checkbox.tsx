import { FC } from 'react';
import classNames from 'classnames';

import './styles.scss';

type PropsType = {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
};

export const Checkbox: FC<PropsType> = ({ className, value, onChange }) => {
  return (
    <div className={classNames('checkbox', className)}>
      <input
        type="checkbox"
        onChange={() => onChange(!value)}
        checked={value}
        id="happy"
        className="checkbox__field"
      />
      <label htmlFor="happy" className="checkbox__label">
        Happy
      </label>
    </div>
  );
};
