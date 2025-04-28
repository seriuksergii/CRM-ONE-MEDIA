import "./Icon.scss";
const Icon = ({ name, className, stroke = "" }) => (
  <svg className={className} style={{ stroke: stroke }}>
    <use xlinkHref={`/sprite.svg#${name}`} />
  </svg>
);

export default Icon;
