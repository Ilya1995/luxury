import { FC } from 'react';

import { faq } from './constants';

import './styles.scss';

type PropsType = {};

export const FAQ: FC<PropsType> = () => {
  return (
    <div className="faq">
      <div>
        <div className="faq__title">Часто задаваемые вопросы</div>
        <div className="faq__subtitle">Все, что нужно знать о нас</div>
      </div>
      <div className="faq-list">
        {faq.map(({ title, description }) => (
          <div key={title} className="faq-list__item">
            <div className="flex-between">
              <div className="faq-list__item-title">{title}</div>
              <img className="pointer" alt="plus" src="./plus.svg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
