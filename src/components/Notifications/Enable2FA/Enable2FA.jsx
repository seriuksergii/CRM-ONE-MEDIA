import React from 'react';
import { BodyBase, LabelSmall } from '../../Typography/Headlines&Texts';
import styles from './Enable2FA.module.scss';
import Button from '../../Button/Button';

const Enable2FA_NOTIFICATION_CONFIG = {
  enable: {
    bgColor: '#EAF3FF',
    borderColor: '#AAC5F9',
    color: '#0066CC',
    title: 'Enhance Your Account Security',
    template: () => ({
      description:
        'Enable two-factor authentication to add an extra layer of security to your account',
    }),
  },
};

const Enable2FA = ({ type = 'neutral' }) => {
  const config =
    Enable2FA_NOTIFICATION_CONFIG[type] ||
    Enable2FA_NOTIFICATION_CONFIG.neutral;
  const { description } = config.template();

  return (
    <div
      className={styles.notification}
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      <div className={styles.textContainer}>
        <BodyBase style={{ color: config.color, marginBottom: '4px' }}>
          {config.title}
        </BodyBase>
        <LabelSmall style={{ color: config.color }}>{description}</LabelSmall>
      </div>
      <Button
        type="submit"
        text="Enable 2FA"
        className="btn white"
        onClick={() => console.log('2FA enabled')}
      />
    </div>
  );
};

export default React.memo(Enable2FA);
