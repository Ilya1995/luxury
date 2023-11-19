import { FC } from 'react';
import classNames from 'classnames';

import './styles.scss';

type PropsType = {
  value: boolean;
  label: string;
  onChange: (value: boolean) => void;
  className?: string;
};

export const Checkbox: FC<PropsType> = ({
  className,
  value,
  label,
  onChange,
}) => {
  const handleChange = (event: any) => {
    // event.stopPropagation();
    onChange(!value);
  };

  return (
    <div className={classNames('checkbox', className)}>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={value}
        id={'checkbox' + label}
        className="checkbox__field"
      />
      <label htmlFor={'checkbox' + label} className="checkbox__label">
        {label}
      </label>
    </div>
  );
};
