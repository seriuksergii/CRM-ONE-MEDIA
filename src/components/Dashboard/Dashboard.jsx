import { useState } from "react";
import Button from "../Button/Button";
import PopUp from "../PopUp/PopUp";

import Table from "../Table/Table";
import ActionBar from "../Table/ActionBar";

import HeaderTitle from "../HeaderTitle/HeaderTitle"; 


import "./Dashboard.scss";

const TableHeadData = [
  {
    key: "campaign",
    title: "Campaign",
    sortable: true,
    render: (row) => (
      <div>
        <p>{row.campaign}</p>
        <button onClick={() => alert(`Clicked ${row.campaign}`)}>Button</button>
      </div>
    ),
  },
  { key: "status", title: "Status", sortable: true },
  { key: "objective", title: "Objective", sortable: true },
  { key: "budget", title: "Budget", sortable: true },
  { key: "spent", title: "Spent", sortable: true },
  { key: "impressions", title: "Impressions", sortable: true },
  { key: "clicks", title: "Clicks", sortable: true },
  { key: "ctr", title: "CTR", sortable: true },
  { key: "cpc ", title: "CPC ", sortable: true },
];
const TableBodyData = [
  {
    id: 1,
    campaign: "Campaign Alpha",
    status: "Active",
    objective: "Leads",
    budget: "$500",
  },
  {
    id: 2,
    campaign: "Campaign Beta",
    status: "Paused",
    objective: "Clicks",
    budget: "$300",
  },
];

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
        <div className="">
          <Table
            columns={TableHeadData}
            data={TableBodyData}
            selectable={false}
            onSelectionChange={(selectedRows) => setSelectedUsers(selectedRows)}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
