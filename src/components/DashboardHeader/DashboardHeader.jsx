import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { CiSearch } from 'react-icons/ci';
import { FiBell } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';

const DashboardHeader = ({ searchQuery, setSearchQuery, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="dashboard_header">
      <div className="dashboard_header_left">
        <Link to="/dashboard">
          <img src="/Heading 1.png" alt="logo" className="dashboard_header_logo" />
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
              <IoChevronDownOutline className={`admin_arrow ${isDropdownOpen ? 'open' : ''}`} />
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
  );
};

export default DashboardHeader;