import { FC, useState } from 'react';
import classNames from 'classnames';

import { Icon } from '../Icon';

import './styles.scss';

type PropsType = {
  className?: string;
  options: string[];
};

export const Dropdown: FC<PropsType> = ({ className, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>();

  const handleSelect = (event: any, value: string) => {
    event.stopPropagation();

    if (selected === value) {
      return setSelected(undefined);
    }

    setSelected(value);
  };

  return (
    <div
      className={classNames('dropdown', { dropdown_open: isOpen }, className)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="dropdown-header">
        <div className="dropdown-header-title">Тип продукта</div>
        <Icon
          className={classNames('dropdown-header-icon', {
            'dropdown-header-icon_open': isOpen,
          })}
          name="arrow-down"
          color="var(--grey-600)"
          pointer
          size={1.5}
        />
      </div>
      <div
        className={classNames('dropdown-list', {
          'dropdown-list_hidden': !isOpen,
        })}
      >
        {options.map((item) => (
          <div
            key={item}
            onClick={(event) => handleSelect(event, item)}
            className={classNames('dropdown-list-item', {
              'dropdown-list-item_selected': item === selected,
            })}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
