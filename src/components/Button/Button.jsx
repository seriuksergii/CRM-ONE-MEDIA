import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";
import "./Button.scss";

export default function Button({
  className,
  iconLeft = false,
  IconClassLeft = "",
  text = "",
  iconRight = "",
  IconClassRight = "",
  onClick,
  type = "button",
  isActive = false,
  ariaLabel = false,
  to, // пропс для ссылки
}) {
  const Component = to ? Link : "button";
  return (
    <Component
      type={type}
      className={`btn ${className ? className : ""} ${
        isActive ? "active" : ""
      }`}
      onClick={onClick}
      to={to}
      aria-label={ariaLabel}
    >
      {iconLeft && <Icon name={iconLeft} className={IconClassLeft} />}
      {text && <span>{text}</span>}

      {iconRight && <Icon className={IconClassRight} name={iconRight} />}
    </Component>
  );
}
