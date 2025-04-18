import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { TbLayoutSidebarRightExpand } from 'react-icons/tb';
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from 'react-icons/fi';
import { getCurrentUserProfile } from '../../api/api';
import '../../styles/dashdoardStyles.css';

const Sidebar = ({ isSidebarCollapsed, toggleSidebar }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser);
  
  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

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
        <NavLink to="/dashboard/dashboardpage" className="menu_item">
          <LuLayoutDashboard className="menu_icon" />
          <span className="menu_label">Dashboard</span>
        </NavLink>
        <NavLink to="/dashboard/users" className="menu_item">
          <FiUsers className="menu_icon" />
          <span className="menu_label">Users</span>
        </NavLink>
      </div>
      <div className="user_profile_mini">
        <img src="/Overlay.svg" alt="User" className="user_avatar" />
        {!isSidebarCollapsed && currentUser && (
          <div className="user_info_mini">
            <div className="user_name_mini">{currentUser.name || 'Admin User'}</div>
            <div className="user_email_mini">{currentUser.email || 'admin@example.com'}</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;