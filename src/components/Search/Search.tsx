import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import { Icon } from '../Icon';
import { Input } from '../Input';

import './styles.scss';

type PropsType = {
  className?: string;
  isWhite?: boolean;
};

export const Search: FC<PropsType> = ({ className, isWhite }) => {
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (!isFocused && !searchText) {
      setIsActive(false);
    }
  }, [isFocused, searchText]);

  return (
    <div className={classNames('search', className)}>
      <Icon
        name="search"
        className={classNames('search__icon', {
          search__icon_active: !isActive,
        })}
        pointer
        handleClick={() => setIsActive(true)}
        size={1.5}
        color={isWhite ? 'rgba(var(--white))' : 'rgba(var(--grey-800))'}
      />

      <Input
        type="search"
        className={classNames('search__input', {
          search__input_active: isActive,
        })}
        isFocused={isActive}
        value={searchText}
        onChange={setSearchText}
        onFocus={setIsFocused}
      />
    </div>
  );
};
