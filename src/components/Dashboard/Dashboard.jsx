import { useState } from "react";

import Button from "../Button/Button";
import PopUp from "../PopUp/PopUp";

import "./Dashboard.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            <Button
              iconLeft="plus"
              IconClassLeft="icon"
              text="Connect Account"
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen ? (
              <PopUp onClose={() => setIsOpen(false)}>
                {" "}
                <Button text="test" />{" "}
              </PopUp>
            ) : null}
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
