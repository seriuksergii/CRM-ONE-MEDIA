import React from 'react';
import './HeaderTitle.scss';
import '../../../src/reset.css';

const HeaderTitle = ({ title, subtitle }) => {
  return (
    <div className="page-header">
      <h1 className='page-header-title'>{title}</h1>
      {subtitle && <p className='page-header-subtitle'>{subtitle}</p>}
    </div>
  );
};

export default HeaderTitle;
