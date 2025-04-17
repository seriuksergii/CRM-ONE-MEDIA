import React from 'react';
import { Link } from 'react-router-dom';
import { TbLayoutSidebarRightExpand } from 'react-icons/tb';
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from 'react-icons/fi';
import '../../styles/DashboardPage.css';

const Sidebar = ({ isSidebarCollapsed, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <button
        className={`menu_toggle ${isSidebarCollapsed ? 'collapsed' : ''}`}
        onClick={toggleSidebar}
      >
        <TbLayoutSidebarRightExpand size={24} />
      </button>
      <div className="menu_section">
        <div className="menu_title">Navigation</div>
        <Link to="/dashboard/dashboardpage" className="menu_item">
          <LuLayoutDashboard className="menu_icon" />
          <span className="menu_label">Dashboard</span>
        </Link>
        <Link to="/dashboard/users" className="menu_item active">
          <FiUsers className="menu_icon" />
          <span className="menu_label">Users</span>
        </Link>
      </div>
      <div className="user_profile_mini">
        <img src="/Overlay.svg" alt="User" className="user_vatar" />
        <div className="user_info_mini">
          <div className="user_name_mini">Admin User</div>
          <div className="user_email_mini">admin@example.com</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;