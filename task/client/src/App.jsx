import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenThunk } from './features/auth/authThunks';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProctedRoute';
import AdminPage from './pages/AdminPage';
import StudentPage from './pages/StudentPage';
import ManagementPage from './pages/ManagementPage';

const App = () => {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(refreshTokenThunk());
      setCheckingAuth(false);
    };
    checkAuth();

    const interval = setInterval(() => {
      dispatch(refreshTokenThunk());
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (checkingAuth) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token
              ? (user?.role === 'admin' ? <Navigate to="/admin" /> : user?.role === 'student' ? <Navigate to="/student" /> : user?.role === 'management' ? <Navigate to="/management" /> : <Home />)
              : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/management"
          element={
            <ProtectedRoute allowedRoles={['management']}>
              <ManagementPage />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<h1>403 Unauthorized</h1>} />
      </Routes>
    </Router>
  );
};

export default App;