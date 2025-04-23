import React from 'react';
import { HeadingXL, HeadingMD } from '../Typography/Headlines&Texts';
import '../../../src/reset.css';
import './HeaderTitle.scss';


const HeaderTitle = ({ title, subtitle }) => {
  return (
    <div className="page-header">
      <HeadingXL>{title}</HeadingXL>
      {subtitle && <HeadingMD>{subtitle}</HeadingMD>}
    </div>
  );
};

export default HeaderTitle;
