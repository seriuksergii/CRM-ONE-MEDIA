import React from 'react';
import { LabelSmall } from '../../Typography/Headlines&Texts';
import styles from './SmallNotifications.module.scss';

const NOTIFICATION_CONFIG = {
  warning: {
    icon: 'icon-warning',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    color: '#D97706',
    template: (count, expired) => 
      `${count} accounts require attention — ${expired} with expired tokens.`
  },
  positive: {
    icon: 'icon-success',
    bgColor: '#E9FDF0',
    borderColor: '#C5E4CB',
    color: '#16A34A',
    template: (count) => 
      `${count} tokens successfully refreshed.`
  },
  neutral: {
    icon: 'calendar',
    bgColor: '#F0F0F0',
    borderColor: '#C8C8CB',
    color: '#64748B',
    template: (count) => 
      `${count} campaigns scheduled to launch tomorrow.`
  },
  negative: {
    icon: 'icon-error',
    bgColor: '#FDEBEC',
    borderColor: '#FFD9D9',
    color: '#DC2626',
    template: () => 
      'Account token expired — reconnect to avoid data loss.'
  },
};

const SmallNotifications = ({ 
  type = 'neutral', 
  count = 0, 
  expired = 0 
}) => {
  const config = NOTIFICATION_CONFIG[type] || NOTIFICATION_CONFIG.neutral;
  const message = config.template(count, expired);

  return (
    <div
      className={styles.notification}
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
        color: config.color,
      }}
    >
      <span className={styles.icon}>
        <svg width="16" height="16">
          <use href={`/sprite.svg#${config.icon}`} />
        </svg>
      </span>
      <LabelSmall>{message}</LabelSmall>
    </div>
  );
};

export default React.memo(SmallNotifications);