import React from 'react';
import { BodyBase, HeadingMD } from '../Typography/Headlines&Texts';
import Button from '../Button/Button';
import styles from './Notification.module.scss';
import { NOTIFICATION_CONFIG } from './notificationConfig';

const Notification = ({
  variant = 'small',
  type = 'neutral',
  count = 0,
  expired = 0,
  percent = 0,
}) => {
  const variantConfig =
    NOTIFICATION_CONFIG[variant] || NOTIFICATION_CONFIG.small;
  const config = variantConfig[type] || variantConfig.neutral;

  const TextComponent = config.textComponent || BodyBase;
  const TitleComponent = config.titleComponent || HeadingMD;

  try {
    return (
      <div
        className={`${styles.notification} ${styles[variant]}`}
        style={{
          backgroundColor: config.bgColor,
          border: `1px solid ${config.borderColor}`,
          color: config.color,
        }}
      >
        {config.icon && (
          <span className={styles.icon}>
            <svg width={config.iconSize} height={config.iconSize}>
              <use href={`/sprite.svg#${config.icon}`} />
            </svg>
          </span>
        )}

        <div className={styles.content}>
          {config.title && (
            <TitleComponent
              style={{
                color: config.color,
                marginBottom: variant === 'big' ? '4px' : '0',
              }}
            >
              {config.title}
            </TitleComponent>
          )}

          {variant === 'small' ? (
            <TextComponent>{config.template(count, expired)}</TextComponent>
          ) : (
            <TextComponent style={{ color: config.color }}>
              {config.template(count, percent)?.description || ''}
            </TextComponent>
          )}
        </div>

        {config.action && (
          <Button
            type="submit"
            text={config.action.text}
            variant="secondary"
            onClick={config.action.onClick}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering Notification:', error);
    return null;
  }
};

export default React.memo(Notification);
