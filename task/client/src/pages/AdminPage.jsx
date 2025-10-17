import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Welcome, Admin {user?.name}</h1>
      <p>This is your admin dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminPage;
