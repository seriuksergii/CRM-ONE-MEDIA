import React from 'react';
import styles from './Badges.module.scss';
import { BADGES_CONFIG } from './BadgesConfig';
import { LabelSmall } from '../Typography/Headlines&Texts';

const Badges = ({
  type = 'status',
  variant = 'active',
  withIcon = true,
  className = '',
  style = {},
}) => {
  const config = BADGES_CONFIG[type]?.[variant] || BADGES_CONFIG.status.active;
  const TextComponent = config.textComponent || LabelSmall;
  const isStatusType = type === 'status';
  const shouldShowIcon = withIcon && config.icon;

  return (
    <div
      className={`${styles.badge} ${className} ${
        isStatusType && withIcon ? styles.withStatusIcon : ''
      }`}
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
        color: config.color,
        '--icon-color': config.color,
        '--icon-size': `${config.iconSize}px`,
        ...style,
      }}
    >
      {shouldShowIcon && !isStatusType && (
        <span className={styles.icon}>
          <svg width={config.iconSize} height={config.iconSize}>
            <use href={`/sprite.svg#${config.icon}`} />
          </svg>
        </span>
      )}
      <TextComponent className={styles.text}>{config.title}</TextComponent>
    </div>
  );
};

export default React.memo(Badges);