import { FC, useState } from 'react';
import { Parser } from 'html-to-react';
import { Animate } from 'react-simple-animate';

import { faq } from './constants';

import './styles.scss';

type PropsType = {};

export const FAQ: FC<PropsType> = () => {
  const [open, setOpen] = useState<{ [key in string]: boolean }>({});

  const handleOpen = (id: number) => {
    setOpen({ ...open, [id]: !open[id] });
  };

  return (
    <div className="faq">
      <div>
        <div className="faq__title">Часто задаваемые вопросы</div>
        <div className="faq__subtitle">Все, что нужно знать о нас</div>
      </div>
      <div className="faq-list">
        {faq.map(({ id, title, description }) => (
          <div
            key={id}
            className="faq-list__item"
            onClick={() => handleOpen(id)}
          >
            <div className="flex-between-start">
              <div className="faq-list__item-content">
                <div className="faq-list__item-title">{title}</div>
                {open[id] && (
                  <Animate
                    play={open[id]}
                    start={{ transform: 'translateY(-10px)', opacity: 0 }}
                    end={{ transform: 'translateY(0)', opacity: 1 }}
                    easeType="ease-in"
                  >
                    <div className="faq-list__item-description">
                      {Parser().parse(description)}
                    </div>
                  </Animate>
                )}
              </div>
              <div className="faq-icon">
                <Animate
                  play={!open[id]}
                  start={{ opacity: 0 }}
                  end={{ opacity: 1 }}
                  easeType="ease-in"
                >
                  <img alt="plus" src="./plus.svg" />
                </Animate>
                <Animate
                  play={open[id]}
                  start={{ opacity: 0 }}
                  end={{ opacity: 1 }}
                  easeType="ease-in"
                >
                  <img alt="minus" src="./minus.svg" />
                </Animate>
              </div>
            </div>
            <div className="line faq__line" />
          </div>
        ))}
      </div>
    </div>
  );
};
