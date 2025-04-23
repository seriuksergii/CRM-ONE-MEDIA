import './Typography.scss';

const Typography = ({ variant, tag = 'p', children, className, ...rest }) => {
  const Tag = tag;

  return (
    <Tag className={`typography ${variant} ${className || ''}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Typography;
