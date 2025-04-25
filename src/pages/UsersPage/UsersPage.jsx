import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsers,
  updateUserRoleAndTeam,
  deleteUser,
  getTeams,
} from '../../store/slices/usersSlice';
import './UsersPage.scss';
import { toast } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import Select from '../../components/Select/Select';

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
      team: user.team?.id || '',
    });
    setIsEditModalOpen(true);
  };

  const translateError = (error) => {
    if (error.includes('Role must be one of:')) {
      return 'Роль должна быть одной из: admin, head, team_lead, buyer';
    }
    return error;
  };

  const handleUpdateUser = async (values) => {
    try {
      await dispatch(
        updateUserRoleAndTeam({
          id: selectedUser.id,
          role: values.role,
          team_id: values.team,
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

  const validationSchema = Yup.object().shape({
    role: Yup.string().required('Обовʼязкове поле'),
  });

  const teamOptions = teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));

  return (
    <div className="users_page">
      <HeaderTitle
        title="Users"
        subtitle="Manage users and their access roles"
      />
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
                  <td>{user.team?.name || ''}</td>
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
            <Formik
              initialValues={editForm}
              validationSchema={validationSchema}
              onSubmit={handleUpdateUser}
              enableReinitialize
            >
              <Form>
                <Select
                  label="Role"
                  name="role"
                  options={availableRoles.map((role) => ({
                    value: role,
                    label: role.charAt(0).toUpperCase() + role.slice(1),
                  }))}
                  required
                />
                <Select
                  label="Team"
                  name="team"
                  options={teamOptions}
                  required
                />
                <div className="modal_actions">
                  <button type="submit">Save</button>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
