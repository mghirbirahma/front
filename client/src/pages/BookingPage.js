import React,{useState,useEffect,useCallback} from 'react'
import Layout from '../componemts/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import  moment  from 'moment'
import { DatePicker,TimePicker } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { message } from 'antd';
import { showLoading,hideLoading } from '../redux/features/alertSlice'
//import { DataPicker, DatePicker } from 'antd/es/date-picker/generatePicker/interface';
import { userMenu } from './../Data/data';
const BookingPage = () => {
    const {user}=useSelector((state) => state.user)
    const params = useParams()
    const [doctors, setDoctor] = useState([])
    const [date, setDate] = useState('')
    const [time, setTime] = useState()
    const [isAvailable, setIsAvailable] = useState(false) 
    const  dispatch = useDispatch()
    //login user data
    const getUserData = useCallback(async () => {
        try {
            const res = await axios.post(
                '/api/v1/doctor/getDoctorById',
                { doctorId: params.doctorId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (res.data.success) {
                setDoctor(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [params.doctorId]);
     /********************* booking function *************/
     const handleBooking = async()=> {
        try {
            setIsAvailable(true);
            
                if (!date && !time){
                    return alert ("date & time required");
                }
            
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/book-appointment' , 
            {
                doctorId:params.doctorId,
                userId:userMenu._id,
                doctorInfo:doctors,
                date:date,
                userInfo:user,
                time:time
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
            
            );
            dispatch(hideLoading())
            if (res.data.success){
                message.success(res.data.message)
            }
        } catch (error) {
            //Dispatch(hideLoading())
            console.log(error)
        }
     }
     ///availablity
     const handleAvailability = async()=> {
        try {
            dispatch(showLoading())
            const res = await axios.post(
                '/api/v1/user/booking-availbility',
                { doctorId: params.doctorId, date, time },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );            
            dispatch(hideLoading());
            if(res.data.success){
                setIsAvailable(true);
                console.log(isAvailable);
                message.success(res.data.message);
            }else{
                 message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
     };



     useEffect(() => {
        getUserData();
    }, [getUserData])
    
    return (
        <Layout>
            <h3>BookingPage</h3>
            <div className="container">
                
                <h4>Dr.{doctors.firstName} {doctors.lastName}</h4>
                <h4>Fees : {doctors.feesPerConsultation} </h4>
                <h4>
                    Timmings  : 
                    {doctors.timmings && doctors.timmings[0]} - {" "}
                    {doctors.timmings && doctors.timmings[1]}{" "}
                    
                </h4>
                <div className='d-flex felx-column w-50'>
                    <DatePicker 
                    aria-required={"true"}
                    className="m-2"
                    format="DD-MM-YYYY"
                    onChange={(values) => {
                    //setIsAvailable(false)
                    setDate(moment(values).format("DD-MM-YYYY"))}}
                    />
                    <TimePicker 
                    aria-required={"true"}
                    className="mt-3" format="HH:mm"
                    onChange={(value) =>{ 
                    //setIsAvailable(false)
                       setTime(moment(value).format("HH:mm"))}}
                    />

                    <button className='btn btn-primary mt-2' onClick={handleAvailability}>
                         check availability</button>
                  
                    { ! isAvailable && (
                          <button className='btn btn-dark mt-2' onClick={handleBooking}> 
                          book now </button>
                    )}
                </div>
                
            </div>
        </Layout>

    )
}

export default BookingPage