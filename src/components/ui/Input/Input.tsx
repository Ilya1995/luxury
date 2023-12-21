import { FC, useState, useMemo, useRef, ChangeEvent, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Icon } from '../Icon';

import './styles.scss';

type PropsType = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: (value: boolean) => void;
  type?: 'text' | 'email' | 'search';
  placeholder?: string;
  className?: string;
  messageError?: string;
  isFocused?: boolean;
  hasClear?: boolean;
};

export const Input: FC<PropsType> = ({
  value,
  onChange,
  onFocus = () => {},
  className,
  type = 'text',
  placeholder,
  messageError,
  isFocused,
  hasClear = false,
}) => {
  const { t } = useTranslation();
  const inputEl = useRef<any>(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (isFocused) {
      inputEl.current?.focus();
    }
  }, [isFocused]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value.trim());
  };

  function handleFocus() {
    setIsFocus(true);
    onFocus(true);
  }

  function handleBlur() {
    setIsFocus(false);
    onFocus(false);
  }

  const iconName = useMemo(() => {
    if (!!messageError) return 'warning';
    if (type === 'search') return 'search2';
    if (type === 'email') return 'message2';

    return;
  }, [type, messageError]);

  const customPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    if (type === 'search') return t('search');
    if (type === 'email') return t('email');

    return;
  }, [type, placeholder, t]);

  return (
    <div
      className={classNames(
        'input',
        {
          input_focus: isFocus,
          'input_has-text': !!value,
          'input_has-icon': !!iconName,
          'input_has-clear': !!hasClear,
          'input_has-error': !!messageError,
        },
        className
      )}
    >
      {iconName && <Icon name={iconName} size={1.5} className="input__icon" />}
      <input
        className="input__field"
        ref={inputEl}
        value={value}
        placeholder={customPlaceholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {value && hasClear && (
        <Icon
          name="close3"
          size={1.5}
          pointer
          handleClick={() => onChange('')}
          className="input__clear"
        />
      )}
      <div
        className={classNames('input__error-message', {
          'input__error-message-visible': !!messageError,
        })}
      >
        {messageError}
      </div>
    </div>
  );
};
