import {
  LabelSmall,
  BodyBase,
  HeadingMD,
} from '../../components/Typography/Headlines&Texts';

export const NOTIFICATION_CONFIG = {
  small: {
    neutral: {
      icon: 'calendar',
      bgColor: '#F0F0F0',
      borderColor: '#C8C8CB',
      color: '#64748B',
      template: (count) => `${count} campaigns scheduled to launch tomorrow.`,
      iconSize: 16,
      textComponent: LabelSmall,
    },
    warning: {
      icon: 'icon-warning',
      bgColor: '#FFFBEB',
      borderColor: '#FDE68A',
      color: '#D97706',
      template: (count, expired) =>
        `${count} accounts require attention — ${expired} with expired tokens.`,
      iconSize: 16,
      textComponent: LabelSmall,
    },
    success: {
      icon: 'icon-success',
      bgColor: '#E9FDF0',
      borderColor: '#C5E4CB',
      color: '#16A34A',
      template: (count) => `${count} tokens successfully refreshed.`,
      iconSize: 16,
      textComponent: LabelSmall,
    },
    error: {
      icon: 'icon-error',
      bgColor: '#FDEBEC',
      borderColor: '#FFD9D9',
      color: '#DC2626',
      template: () => 'Account token expired — reconnect to avoid data loss.',
      iconSize: 16,
      textComponent: LabelSmall,
    },
  },
  big: {
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
      iconSize: 36,
      titleComponent: HeadingMD,
      textComponent: BodyBase,
    },
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
      iconSize: 36,
      titleComponent: HeadingMD,
      textComponent: BodyBase,
    },
    success: {
      icon: 'icon-big-success',
      bgColor: '#E9FDF0',
      borderColor: '#C5E4CB',
      color: '#16A34A',
      title: 'Underperforming Campaigns Identified',
      template: (count, percent) => ({
        description: `${count} campaigns have a CTR lower than ${percent}%. Try refreshing creatives or optimizing targeting to improve results.`,
      }),
      iconSize: 36,
      titleComponent: HeadingMD,
      textComponent: BodyBase,
    },
    error: {
      icon: 'icon-big-error',
      bgColor: '#FDEBEC',
      borderColor: '#FFD9D9',
      color: '#DC2626',
      title: 'Incomplete Funnel Data',
      template: () => ({
        description:
          'Key events like "Add to cart" are missing. Your conversion funnel report may be inaccurate. Check your pixel or event setup.',
      }),
      iconSize: 36,
      titleComponent: HeadingMD,
      textComponent: BodyBase,
    },
  },
  action: {
    enable2fa: {
      bgColor: '#EAF3FF',
      borderColor: '#AAC5F9',
      color: '#0066CC',
      title: 'Enhance Your Account Security',
      template: () => ({
        description:
          'Enable two-factor authentication to add an extra layer of security to your account',
      }),
      action: {
        text: 'Enable 2FA',
        onClick: () => console.log('2FA enabled'),
      },
      textComponent: LabelSmall,
      titleComponent: BodyBase,
    },
  },
};
