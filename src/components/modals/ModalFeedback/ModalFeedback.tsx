import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Product } from '../../../types';
import { useWatch, useValidate } from '../../../hooks';
import { Icon } from '../../ui/Icon';
import { Input } from '../../ui/Input';

import './styles.scss';

type PropsType = {
  onClose: () => void;
  onApply: () => void;
  isOpen: boolean;
  product: Product;
  className?: string;
};

let firstRender = true;

export const ModalFeedback: FC<PropsType> = ({
  className,
  isOpen,
  product,
  onClose,
  onApply,
}) => {
  const { t } = useTranslation();
  const [isLock, setIsLock] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { messageError: messageErrorEmail } = useValidate(
    email,
    ['email', 'leastOne'],
    phone
  );
  const { messageError: messageErrorPhone } = useValidate(
    phone,
    ['phone', 'leastOne'],
    email
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      firstRender = true;
    };
  }, []);

  useWatch(() => {
    firstRender = false;
  }, [isOpen]);

  const handleChangeEmail = (value: string) => {
    setEmail(value);
    setShowError(false);
  };

  const handleChangePhone = (value: string) => {
    setPhone(value);
    setShowError(false);
  };

  const fakeRequest = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('ok');
      }, 1000);
    });
  };

  const handleSend = async () => {
    if (messageErrorEmail || messageErrorPhone) {
      setShowError(true);
      return;
    }

    setIsLock(true);

    try {
      await fakeRequest();

      onApply();
      setEmail('');
      setPhone('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLock(false);
    }
  };

  return (
    <div
      className={classNames(
        'modal-feedback-wrapper',
        { 'modal-feedback-wrapper_open': isOpen },
        { 'modal-feedback-wrapper_close': !firstRender && !isOpen },
        className
      )}
    >
      <div className="modal-feedback-wrapper__background" onClick={onClose}>
        <div
          className="modal-feedback"
          onClick={(event) => event.stopPropagation()}
        >
          <Icon
            name="close2"
            handleClick={onClose}
            className="modal-feedback__close"
            color="rgba(var(--blue-grey-300))"
            size={2}
            pointer
          />
          <Icon
            name="logo"
            width={11.6875}
            height={2.5625}
            color={'rgba(var(--grey-800))'}
          />
          <div className="modal-feedback__line" />
          <div className="modal-feedback__title">Уточнить наличие</div>
          <div className="modal-feedback__subtitle">
            {t('modal-feedback-subtitle')}
          </div>
          <div className="modal-feedback__product">
            <img
              className="modal-feedback__product-img"
              src={product.src}
              alt="card"
            />
            <div className="modal-feedback__product-info">
              <div className="modal-feedback__product-info-name">
                {[product.brand, product.name, product.volume].join(' ')}
              </div>
              <div className="modal-feedback__product-info-material">
                {product.material}
              </div>
            </div>
          </div>
          <div className="modal-feedback__fields">
            <Input
              className="modal-feedback__email"
              type="email"
              value={email}
              onChange={handleChangeEmail}
              messageError={showError ? messageErrorEmail : ''}
            />
            <Input
              className="modal-feedback__phone"
              type="phone"
              value={phone}
              onChange={handleChangePhone}
              messageError={showError ? messageErrorPhone : ''}
            />
          </div>

          <button
            className={classNames('modal-feedback__button button', {
              button_disabled: isLock || showError,
            })}
            onClick={handleSend}
          >
            {t('contact-with-me')}
          </button>
        </div>
      </div>
    </div>
  );
};
