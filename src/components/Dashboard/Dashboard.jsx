import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <div className="dashboardPage_wrapper">
        <div className="dashboardPage_header">
          <div className="dashboardPage_header_left">
            <h1 className="dashboardPage_header_title">Dashboard</h1>
            <p className="dashboardPage_header_text">
              Monitor your ad accounts, campaigns and performance
            </p>
          </div>
          <div className="dashboardPage_header_right">
            <button className="dashboardPage_header_button">
              + Connect Account
            </button>
          </div>
        </div>
        <img
          src="/One Media Logo Main Black 1.svg"
          alt=""
          className="dashboardPage_logo"
        />
      </div>
    </>
  );
};

export default Dashboard;
