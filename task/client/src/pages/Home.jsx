import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("user :", user)
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Welcome to Auth App 🔐</h1>
      {user ? (
        <>
          <p>Hello, {user.name}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <p>Please login or register.</p>
      )}
    </div>
  );
};

export default Home;
