import "./Icon.scss";
const Icon = ({ name, className }) => (
  <svg className={className}>
    <use xlinkHref={`/sprite.svg#${name}`} />
  </svg>
);

export default Icon;
