import { FC, useState, useRef } from 'react';
import classNames from 'classnames';

import { Icon } from '../Icon';
import { Input } from '../Input';
import { DropdownCheckbox } from '../DropdownCheckbox';
import { useElementScroll } from '../../hooks';

import './styles.scss';

type SimpleOptions = string[];
type DifficultOptions = { title: string; options: SimpleOptions }[];

type PropsType = {
  className?: string;
  classNameList?: string;
  title: string;
  options: string[] | { title: string; options: string[] }[];
  withSearch?: boolean;
  selected: string | string[];
  onChange: (value: any) => void;
};

export const Dropdown: FC<PropsType> = ({
  className,
  classNameList,
  options,
  title,
  withSearch = false,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const refScroll = useRef<any>();
  const { isEndVisible } = useElementScroll(refScroll);

  const isMultiple = typeof options[0] === 'object';

  const handleChangeOpen = (event: any) => {
    event.stopPropagation();

    setIsOpen(!isOpen);
  };

  const handleSelect = (event: any, value: string) => {
    event.stopPropagation();

    if (selected === value) {
      return onChange(undefined);
    }

    onChange(value);
  };

  return (
    <div
      className={classNames('dropdown', { dropdown_open: isOpen }, className)}
    >
      <div className="dropdown-header" onClick={handleChangeOpen}>
        <div className="dropdown-header-title">{title}</div>
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
        className={classNames(
          'dropdown-list',
          {
            'dropdown-list_hidden': !isOpen,
            'dropdown-list_multiple': isMultiple,
          },
          classNameList
        )}
      >
        {withSearch && (
          <Input
            className="dropdown-list__search"
            type="search"
            value={searchText}
            onChange={setSearchText}
          />
        )}
        <div
          className={classNames('dropdown-list__scroll', {
            'dropdown-list__scroll_mask': !isEndVisible,
          })}
          ref={refScroll}
        >
          {isMultiple &&
            (options as DifficultOptions).map((item, index) => (
              <DropdownCheckbox
                key={item.title}
                onChange={onChange}
                title={item.title}
                selected={selected as string[]}
                options={item.options}
              />
            ))}
          {!isMultiple &&
            (options as SimpleOptions).map((item, index) => (
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
    </div>
  );
};
