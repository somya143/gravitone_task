import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './features/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginSuccess({ user: { name: 'Somya Singh' }, token: '123abc' }));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>React + Vite + Redux Toolkit Setup ✅</h1>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default App;
