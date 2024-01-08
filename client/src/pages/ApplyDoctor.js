import React from 'react'
import Layout from '../componemts/Layout';
import {Form,Row,TimePicker,message} from 'antd'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
const ApplyDoctor = () => {

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate(); 
    // handle form 
  const handleFinish = async (values) => {
    try {
        dispatch(showLoading());
        const res = await axios.post('/api/v1/user/apply-doctor', {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timmings[0]).format("HH:mm"),
            moment(values.timmings[1]).format("HH:mm"),
          ]
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        dispatch(hideLoading());
        if (res.data.success) {
          message.success(res.data.success);
          Navigate('/');
        } else {
          message.error(res.data.error);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(values);
        message.error('Something went wrong');
      }
    }

    return (
        <Layout>
            <h1 className="text-center">ApplyDoctor</h1>
            <form layout="vertical" onFinish={handleFinish} className="">
             <h4 className="text-light">Personnel Details</h4>
                <Row>
                    <col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name name" name=" firstName" required rules={[{required:true}]} >
                          <input type="text" placeholder="your first  name "/>
                        </Form.Item>
                    </col>
                </Row>
                <Row>
                    <col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name name" name=" phoneNo" required rules={[{required:true}]} >
                          <input type="text" placeholder="your  phone number "/>
                        </Form.Item>
                    </col>
                </Row>
                <Row>
                    <col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name=" email" required rules={[{required:true}]} >
                          <input type="text" placeholder="your email "/>
                        </Form.Item>
                    </col>
                </Row>
                <Row>
                    <col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name=" website" required rules={[{required:true}]} >
                          <input type="text" placeholder="your website "/>
                        </Form.Item>
                    </col>
                </Row>
                <Row>
                    <col xs={24} md={24} lg={8}>
                        <Form.Item label="Adresse" name=" adresse" required rules={[{required:true}]} >
                          <input type="text" placeholder="your  clinic adresse "/>
                        </Form.Item>
                    </col>
                </Row>
            </form>
            <form layout="vertical" onFinish={handleFinish} className="">
             <h4 className="text-light">Professional Details</h4>
                <Row>
                    <col xs={24} md={24} lg={8}>
                        <Form.Item label="Specialization" name=" specialization" required rules={[{required:true}]} >
                          <input type="text" placeholder="your speciality "/>
                        </Form.Item>
                    </col>
                </Row>
                <Row>
                    <col xs={24} md={24} lg={8}>
                        <Form.Item label="Experience" name=" experience" required rules={[{required:true}]} >
                          <input type="text" placeholder="your experience "/>
                        </Form.Item>
                    </col>
                </Row>
                <Row>
                    <col xs={24} md={24} lg={8}>
                        <Form.Item label="Fees Per Consultation" name=" feesPerConsultation" required rules={[{required:true}]} >
                          <input type="text" placeholder="your fees per consultation "/>
                        </Form.Item>
                    </col>
                </Row>
                <Row>
                    <col xs={24} md={24} lg={8}>
                        <Form.Item label="Timmings" name=" timmings" required rules={[{required:true}]} >
                          <TimePicker.RangePicker format='hh:mm'/>
                        </Form.Item>
                    </col>
                    <col  xs={24} md={24} lg={8}></col>
                    <col  xs={24} md={24} lg={8}>
                    <button className="btn btn-primary" type="submit"> Submit </button>
                    </col>
                    
                </Row>
                <div className="d-flex justify-content-end">
                    
                </div>
            </form>
        </Layout>
    );
}

export default ApplyDoctor