import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { FiBell } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import { logoutUser } from '../../api/api';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <div className="dashboard_header_left">
          <Link to="/">
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
      <main className="dashboard_content">
        <h1 className="dashboard_title">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </main>
    </div>
  );
};

export default Dashboard;
