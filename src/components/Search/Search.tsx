import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { Icon } from '../ui/Icon';
import { Input } from '../ui/Input';
import { setSearchText } from '../../store/reducer';
import { RootState } from '../../store';
import { useDebounce, useWatch } from '../../hooks';

import './styles.scss';

type PropsType = {
  className?: string;
  isWhite?: boolean;
};

export const Search: FC<PropsType> = ({ className, isWhite }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchText } = useSelector((state: RootState) => state.general);

  const [isActive, setIsActive] = useState(!!searchText);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(searchText);
  const debouncedValue = useDebounce<string>(value, 500);

  // сброс строки поиска, если обнулили вне компонента
  useEffect(() => {
    if (searchText === '') {
      setValue('');
    }
  }, [searchText]);

  useEffect(() => {
    if (!isFocused && !value) {
      setIsActive(false);
    }
  }, [isFocused, value]);

  useWatch(() => {
    dispatch(setSearchText(debouncedValue));

    if (pathname === '/' && !!debouncedValue) {
      navigate('/catalog');
    }
  }, [debouncedValue, dispatch, navigate, pathname]);

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
        hasClear
        isFocused={isActive && !value}
        value={value}
        onChange={setValue}
        onFocus={setIsFocused}
      />
    </div>
  );
};
