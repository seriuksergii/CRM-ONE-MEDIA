import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsers,
  updateUserRoleAndTeam,
  deleteUser,
  getTeams
} from '../../api/api';
import './UsersPage.css';

const UsersPage = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    role: '',
    team: ''
  });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getTeams());
  }, [dispatch]);

  const users = useSelector(state => state.users?.users || []);
  const teams = useSelector(state => state.users?.teams || []);
  const loading = useSelector(state => state.users?.loading);
  const error = useSelector(state => state.users?.error);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      role: user.role,
      team: user.team
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      await dispatch(updateUserRoleAndTeam({
        id: selectedUser.id,
        ...editForm
      }));
      setIsEditModalOpen(false);
      dispatch(getAllUsers());
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await dispatch(deleteUser(id));
      dispatch(getAllUsers());
    }
  };

  if (loading) return <div className="users-loading">Loading...</div>;
  if (error) return <div className="users-error">{error}</div>;

  return (
    <div className="users-page">
      <h1>Users Management</h1>
      
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Team</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.team}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <div className="edit-modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <div className="form-group">
              <label>Role:</label>
              <select
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="head">Head</option>
              </select>
            </div>
            <div className="form-group">
              <label>Team:</label>
              <select
                value={editForm.team}
                onChange={(e) => setEditForm({ ...editForm, team: e.target.value })}
              >
                <option value="">Select Team</option>
                {Array.isArray(teams) && teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
            <div className="modal-actions">
              <button onClick={handleUpdateUser}>Save</button>
              <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
