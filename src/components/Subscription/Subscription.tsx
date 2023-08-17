import { FC, useState, ChangeEvent } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { sendEmail } from '../../store/actionCreator';

import './styles.scss';

type PropsType = {
  isMobile: boolean;
};

export const Subscription: FC<PropsType> = ({ isMobile }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isLock, setIsLock] = useState(false);
  const { t } = useTranslation();
  const text = isMobile ? t('first-know-mobile') : t('first-know');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.trim());
    setIsValid(true);
  };

  const handleSendEmail = async () => {
    const EMAIL_REGEXP =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const isValid = EMAIL_REGEXP.test(email);
    setIsValid(isValid);
    if (!isValid) return;

    setIsLock(true);

    try {
      await toast.promise(sendEmail(email), {
        pending: t('wait'),
        success: t('success-subscribe'),
        error: t('error-subscribe'),
      });
      setEmail('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLock(false);
    }
  };

  return (
    <div className="subscription">
      <div className="subscription__content">
        <div className="subscription__header">{t('aware-of-trends')}</div>
        <div className="subscription__text">{text}</div>
        <div className="subscription__controls">
          <div>
            <input
              className={classNames('input subscription__controls-email', {
                'subscription__controls-email_invalid': !isValid,
              })}
              value={email}
              onChange={handleChange}
              placeholder="E-mail"
            />
            <div className="email-error">{t('email-error')}</div>
          </div>

          <button
            className={classNames('button shadow', {
              button_disabled: isLock || !isValid,
            })}
            onClick={handleSendEmail}
          >
            {t('subscribe')}
          </button>
        </div>

        <div className="subscription__confidentiality">
          {t('you-agree')}&nbsp;
          <a
            className="subscription__confidentiality-link"
            href="https://dzen.ru/"
            rel="noreferrer"
            target="_blank"
          >
            {t('privacy-policy')}
          </a>
        </div>
      </div>
      <div className="subscription__bg" />
    </div>
  );
};
