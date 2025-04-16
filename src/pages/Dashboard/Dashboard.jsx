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
          <div className="search-container">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="notifications">
            <FiBell className="notification-icon" />
            <div className="notification-badge">2</div>
          </div>
          <div className="admin-dropdown">
            <div className="admin-trigger" onClick={toggleDropdown}>
              <div className="admin-icon">
                <FaRegUserCircle />
              </div>
              <div className="admin-info">
                <span className="admin-name">Admin</span>
                <IoChevronDownOutline
                  className={`admin-arrow ${isDropdownOpen ? 'open' : ''}`}
                />
              </div>
            </div>
            <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="sidebar-wrapper">
          <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <button
              className={`menu-toggle ${isSidebarCollapsed ? 'collapsed' : ''}`}
              onClick={toggleSidebar}
            >
              <TbLayoutSidebarRightExpand size={24} />
            </button>
            <div className="menu-section">
              <div className="menu-title">Navigation</div>
              <Link to="/dashboard/dashboardpage" className="menu-item">
                <LuLayoutDashboard className="menu-icon" />
                <span className="menu-label">Dashboard</span>
              </Link>
              <Link to="/dashboard/users" className="menu-item active">
                <FiUsers className="menu-icon" />
                <span className="menu-label">Users</span>
              </Link>
            </div>
            <div className="user-profile-mini">
              <img src="/Overlay.svg" alt="User" className="user-avatar" />
              <div className="user-info-mini">
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
