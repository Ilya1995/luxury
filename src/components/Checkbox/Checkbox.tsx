import { FC, useMemo } from 'react';
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

  const customColor = useMemo(() => {
    if (label === 'Желтый') return 'checkbox-yellow';
    if (label === 'Коричневый') return 'checkbox-brown';
    if (label === 'Красный') return 'checkbox-red';
    if (label === 'Оранжевый') return 'checkbox-orange';
    if (label === 'Зеленый') return 'checkbox-green';
    if (label === 'Синий') return 'checkbox-blue';
    if (label === 'Фиолетовый') return 'checkbox-violet';
    if (label === 'Серый') return 'checkbox-grey';
    if (label === 'Белый') return 'checkbox-white';
    if (label === 'Черный') return 'checkbox-black';
  }, [label]);

  return (
    <div className={classNames('checkbox', className, customColor)}>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={value}
        id={'checkbox' + label}
        className={classNames('checkbox__field', {
          'checkbox__field_custom-color': !!customColor,
        })}
      />
      <label htmlFor={'checkbox' + label} className="checkbox__label">
        {label}
      </label>
    </div>
  );
};
