import React, { useEffect, useState } from 'react';
import Layout from '../../componemts/Layout';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment';
import { format } from 'morgan';
import { Navigate } from 'react-router-dom';

const Profile = () => {
   
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  //update info 
  //handle form 
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading())
      const res = axios.post('/api/v1/doctor/updateProfile',
        { ...values, userId: user._id ,
        timmings : [
          moment(doctor.timmings[0]),format("HH:mm"),
          moment(doctor.timmings[1]),format("HH:mm"),
    ]}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      })
      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.message);
        Navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error)
      message.error('somthing went wrong')
    }

  }
   //getDoc info 
   const getDoctorInfo = async (values) => {

    try {
      dispatch(showLoading());
      const res = await axios.post
        (`/api/v1/doctor/getDoctorInfo`,
          { userId: params.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
      dispatch(hideLoading());
      if (res.data.success) {
         message.success(res.data.message);
        navigate("/");
        }else{
        message.error(res.data.success);
        setDoctor(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('something went wrong ')
    }
  };
  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
    return (
        <Layout>
          <h1>Manage Profile</h1>
    
          <Form layout="vertical" onFinish={handleFinish} 
          className="m-3" initialValue={{
            ...doctor,
            timmings:[
              moment(doctor?.timings[0],'HH:mm'),
              moment(doctor?.timings[1],'HH:mm'),
            ],
          }}>
            <h4 className="text-light">Personnel Details</h4>
            <Row>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                  <Input placeholder="Your First Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                  <Input placeholder="Your Last Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                  <Input type="email" placeholder="Your Email" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="website" required rules={[{ required: true }]}>
                  <Input type="url" placeholder="Your Website" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                  <Input placeholder="Your Clinic Address" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
    
          <Form layout="vertical" onFinish={handleFinish} className="">
            <h4 className="text-light">Professional Details</h4>
            <Row>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                  <Input placeholder="Your Speciality" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <col xs={24} md={24} lg={8}>
                <Form.Item label="Experience" name=" experience" required rules={[{ required: true }]} >
                  <input type="text" placeholder="your experience " />
                </Form.Item>
              </col>
            </Row>
            <Row>
              <col xs={24} md={24} lg={8}>
                <Form.Item label="Fees Per Consultation" name=" feesPerConsultation" required rules={[{ required: true }]} >
                  <input type="text" placeholder="your fees per consultation " />
                </Form.Item>
              </col>
            </Row>
            <Row>
              <col xs={24} md={24} lg={8}>
                <Form.Item label="Timmings" name=" timmings" required rules={[{ required: true }]} >
                  <TimePicker.RangePicker format='hh:mm' />
                </Form.Item>
              </col>
              <col xs={24} md={24} lg={8}></col>
              <col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn" type="update"> update  </button>
              </col>
    
            </Row>
            <div className="d-flex justify-content-end">
    
            </div>
          </Form>
    
    
    
        </Layout>
    
      );
}

export default Profile