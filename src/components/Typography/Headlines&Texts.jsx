import Typography from './Typography';
import './Typography.scss';

export const HeadingXL = (props) => (
  <Typography variant="heading-xl" tag="h1" {...props} />
);

export const HeadingLG = (props) => (
  <Typography variant="heading-lg" tag="h2" {...props} />
);

export const HeadingMD = (props) => (
  <Typography variant="heading-md" tag="h3" {...props} />
);

export const BodyBase = (props) => (
  <Typography variant="body-base" tag="p" {...props} />
);

export const BodySmall = (props) => (
  <Typography variant="body-small" tag="p" {...props} />
);

export const LabelSmall = (props) => (
  <Typography variant="label-small" tag="span" {...props} />
);
