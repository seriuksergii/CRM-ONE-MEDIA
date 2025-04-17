import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsers,
  updateUserRoleAndTeam,
  deleteUser,
  getTeams,
} from '../../api/api';
import './UsersPage.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    role: '',
    team: '',
  });
  const navigate = useNavigate();

  const availableRoles = ['admin', 'head', 'team_lead', 'buyer'];

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getTeams());
  }, [dispatch]);

  const users = useSelector((state) => state.users?.users || []);
  const teams = useSelector((state) => state.users?.teams || []);
  const loading = useSelector((state) => state.users?.loading);
  const error = useSelector((state) => state.users?.error);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      role: user.role === 'bayer' ? 'buyer' : user.role,
      team: user.team || '',
    });
    setIsEditModalOpen(true);
  };

  const translateError = (error) => {
    if (error.includes('Role must be one of:')) {
      return 'Роль должна быть одной из: admin, head, team_lead, buyer';
    }
    return error;
  };

  const handleUpdateUser = async () => {
    try {
      await dispatch(
        updateUserRoleAndTeam({
          id: selectedUser.id,
          role: editForm.role,
          team: editForm.team,
        })
      ).unwrap();

      setIsEditModalOpen(false);
      setSelectedUser(null);
      dispatch(getAllUsers());
      toast.success('Пользователь успешно обновлен');
    } catch (error) {
      if (error === 'Необходимо авторизоваться') {
        navigate('/login');
      } else {
        toast.error(
          translateError(error) || 'Ошибка при обновлении пользователя'
        );
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await dispatch(deleteUser(id));
      dispatch(getAllUsers());
    }
  };

  if (loading) return <div className="users_loading">Loading...</div>;
  if (error) return <div className="users_error">{error}</div>;

  const formatRoleForDisplay = (role) => {
    if (role === 'bayer') return 'buyer';
    return role;
  };

  return (
    <div className="users_page">
      <h1>Users</h1>

      <div className="users_table">
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
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatRoleForDisplay(user.role)}</td>
                  <td>{user.team}</td>
                  <td>
                    <button onClick={() => handleEditUser(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <div className="edit_modal">
          <div className="modal_content">
            <h2>Edit User</h2>
            <div className="form_group">
              <label>Role:</label>
              <select
                value={editForm.role || ''}
                onChange={(e) =>
                  setEditForm({ ...editForm, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="form_group">
              <label>Team:</label>
              <select
                value={editForm.team || ''}
                onChange={(e) =>
                  setEditForm({ ...editForm, team: e.target.value })
                }
              >
                <option value="">Select Team</option>
                {Array.isArray(teams) &&
                  teams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
              </select>
            </div>
            <div className="modal_actions">
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
