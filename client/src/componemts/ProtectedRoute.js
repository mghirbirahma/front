import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';

export default function ProtectedRoute({ children }) {
  const Dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        Dispatch(showLoading());
        const res = await axios.post(
          '/api/v1/user/getUserData',
          { token: localStorage.getItem('token') },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        Dispatch(hideLoading());
        if (res.data.success) {
          Dispatch(setUser(res.data.data));
        } else {
          <Navigate to="/login" />;
          localStorage.clear();
        }
      } catch (error) {
        Dispatch(hideLoading());
        localStorage.clear();
        console.log(error);
      }
    };

    if (!user) {
      getUser();
    }
  }, [Dispatch, user]);

  if (localStorage.getItem('token')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
