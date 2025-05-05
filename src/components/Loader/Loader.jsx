import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Loader.module.scss';

const Loader = ({
  size = 70,
  color = '#0066CC',
  bgColor = 'rgba(0, 0, 0, 0.5)',
  text,
}) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay} style={{ backgroundColor: bgColor }}>
      <div className={styles.content}>
        <div
          className={styles.spinner}
          style={{
            width: size,
            height: size,
            borderTopColor: color,
          }}
        ></div>
        {text && <p className={styles.text}>{text}</p>}
      </div>
    </div>,
    document.body
  );
};

export default Loader;
