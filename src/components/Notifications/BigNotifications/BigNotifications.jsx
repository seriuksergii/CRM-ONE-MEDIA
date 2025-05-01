import React from 'react';
import { BodyBase, HeadingMD } from '../../Typography/Headlines&Texts';
import styles from './BigNotifications.module.scss';

const BIG_NOTIFICATION_CONFIG = {
  warning: {
    icon: 'icon-big-warning',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    color: '#D97706',
    title: 'Audience Overlap Detected',
    template: () => ({
      description:
        'Some campaigns are targeting the same audience, which may reduce overall performance. Consider adjusting your targeting settings.',
    }),
  },
  positive: {
    icon: 'icon-big-success',
    bgColor: '#E9FDF0',
    borderColor: '#C5E4CB',
    color: '#16A34A',
    title: 'Underperforming Campaigns Identified',
    template: (count, percent) => ({
      description: `${count} campaigns have a CTR lower than ${percent}%. Try refreshing creatives or optimizing targeting to improve results.`,
    }),
  },
  neutral: {
    icon: 'icon-big-gray',
    bgColor: '#F0F0F0',
    borderColor: '#C8C8CB',
    color: '#64748B',
    title: 'Limited Campaign Metrics Visibility',
    template: () => ({
      description:
        'Some analytics like CPA or ROAS are currently unavailable. Connect event tracking to unlock full campaign insights.',
    }),
  },
  negative: {
    icon: 'icon-big-error',
    bgColor: '#FDEBEC',
    borderColor: '#FFD9D9',
    color: '#DC2626',
    title: 'Incomplete Funnel Data',
    template: () => ({
      description:
        'Key events like "Add to cart" are missing. Your conversion funnel report may be inaccurate. Check your pixel or event setup.',
    }),
  },
};

const BigNotification = ({ type = 'neutral', count = 0, percent = 0 }) => {
  const config =
    BIG_NOTIFICATION_CONFIG[type] || BIG_NOTIFICATION_CONFIG.neutral;
  const { description } = config.template(count, percent);

  return (
    <div
      className={styles.notification}
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      <div className={styles.iconContainer}>
        <svg width="36" height="36">
          <use href={`/sprite.svg#${config.icon}`} />
        </svg>
      </div>
      <div className={styles.content}>
        <HeadingMD style={{ color: config.color, marginBottom: '4px' }}>
          {config.title}
        </HeadingMD>
        <BodyBase style={{ color: config.color }}>{description}</BodyBase>
      </div>
    </div>
  );
};

export default React.memo(BigNotification);
