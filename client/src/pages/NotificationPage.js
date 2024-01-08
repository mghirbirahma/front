import React from 'react'
import Layout from '../componemts/Layout';
import {Tabs} from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
const NotificationPage = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/get-all-notification',
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('something went wrong ');
    }
  };
  //delete notifications

  const handleDeleteAllRead = async() => {
    try {
        dispatch(showLoading())
        const res = await axios.post('api/v1/user/delete-all-notification',
        {
            userId: user._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
    } catch (error) {
        //dispatch(hideLoading());
        console.log(error)
        message.error("something went wrong in notification ")
    }
  };
    return (
        <Layout>
          <h4 className="p-3 text-center">Notification Page </h4>
          <Tabs>
            <Tabs.TabPane tab="unRead" key={0}>
              <div className="d-flex justify-content-end">
                <h4 className="p-2 text-primary" style={{ cursor: 'pointer' }}> 
                onClick={handleMarkAllRead}
                  mark all read{' '}
                </h4>
              </div>
              {user?.Notification.map((notificationMgs) => (
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div
                    className="card-text"
                    onClick={() => navigate(notificationMgs.onClickPath)}
                  >
                    {notificationMgs.message}{' '}
                  </div>
                </div>
              ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read" key={1}>
              <div className="d-flex justify-content-end">
                <h4 className="p-2" onClick={handleDeleteAllRead}>
                  delete all read{' '}
                </h4>
              </div>
              {user?.seennotification.map((notificationMgs) => (
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div
                    className="card-text"
                    onClick={() => navigate(notificationMgs.onClickPath)}
                  >
                    {notificationMgs.message}{' '}
                  </div>
                </div>
              ))}
            </Tabs.TabPane>
          </Tabs>
        </Layout>
      );
}

export default NotificationPage