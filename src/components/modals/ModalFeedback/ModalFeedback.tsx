import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useWatch } from '../../../hooks';
import { Icon } from '../../ui/Icon';

import './styles.scss';

type PropsType = {
  onClose: () => void;
  isOpen: boolean;
  className?: string;
};

let firstRender = true;

export const ModalFeedback: FC<PropsType> = ({
  className,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

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

  useWatch(() => {
    firstRender = false;
  }, [isOpen]);

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
        </div>
      </div>
    </div>
  );
};
