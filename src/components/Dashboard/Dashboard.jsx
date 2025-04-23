import { useState } from "react";
import Button from "../Button/Button";
import PopUp from "../PopUp/PopUp";
import HeaderTitle from "../HeaderTitle/HeaderTitle"; 

import "./Dashboard.scss";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="dashboardPage_wrapper">
        <div className="dashboardPage_header">
          <div className="dashboardPage_header_left">
            <HeaderTitle
              title="Dashboard"
              subtitle="Monitor your ad accounts, campaigns and performance"
            />
          </div>

          <div className="dashboardPage_header_right">
            <Button
              iconLeft="plus"
              IconClassLeft="icon"
              text="Connect Account"
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <PopUp onClose={() => setIsOpen(false)}>
                <Button text="test" />
              </PopUp>
            )}
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
