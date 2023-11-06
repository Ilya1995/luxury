import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type ValidateType = 'email' | 'required' | 'leastOne';

const EMAIL_REGEXP =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

export const useValidate = (
  value: string,
  types: ValidateType[],
  additionalValue?: string
) => {
  const { t } = useTranslation();

  const messageEmail = useMemo(() => {
    if (!types.includes('email')) return '';
    if (EMAIL_REGEXP.test(value)) return '';

    return t('email-error');
  }, [types, value, t]);

  return { messageError: messageEmail };
};
