import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { FiBell } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import { TbLayoutSidebarRightExpand } from 'react-icons/tb';
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from 'react-icons/fi';
import { logoutUser } from '../../api/api';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <div className="dashboard_header_left">
          <Link to="/dashboard">
            <img
              src="/Heading 1.png"
              alt="logo"
              className="dashboard_header_logo"
            />
          </Link>
        </div>
        <div className="dashboard_header_right">
          <div className="search_container">
            <CiSearch className="search_icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search_input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="notifications">
            <FiBell className="notification_icon" />
            <div className="notification_badge">2</div>
          </div>
          <div className="admin_dropdown">
            <div className="admin_trigger" onClick={toggleDropdown}>
              <div className="admin_icon">
                <FaRegUserCircle />
              </div>
              <div className="admin_info">
                <span className="admin_name">Admin</span>
                <IoChevronDownOutline
                  className={`admin_arrow ${isDropdownOpen ? 'open' : ''}`}
                />
              </div>
            </div>
            <div className={`dropdown_menu ${isDropdownOpen ? 'open' : ''}`}>
              <div className="dropdown_item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard_content">
        <div className="sidebar_wrapper">
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
        </div>
        <main
          className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
