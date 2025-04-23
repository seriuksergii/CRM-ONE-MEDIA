import { useEffect } from "react";
import ReactDOM from "react-dom";

import Icon from "../Icon/Icon";

import "./PopUp.scss";

export default function PopUp({ children, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup__content">
        <button
          style={{ stroke: "white" }}
          className="popup__close"
          onClick={onClose}
        >
          <Icon name="close" className="icon" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
