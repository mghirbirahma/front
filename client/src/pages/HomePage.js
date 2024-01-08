import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import '../styles/LayoutStyles.css';
import Layout from '../componemts/Layout';
import DoctorList from '../componemts/DoctorList';
import { Row } from 'antd';
const HomePage = () => {
  const [doctors,setDoctor] = useState([])
  // login user data
  const getUserData = async () => {
   try {
    const res = await axios.get(
      "/api/v1/user/getAllDoctors",
      {},
      {
        headers:{
          Authorization:"Bearer" + localStorage.getItem("token"),
        },
      }
    );
    if(res.data.success){
      setDoctor(res.data.data)
    }
   } catch (error) {
    console.log(error);
   }
  }
  useEffect(() => {
    getUserData()
  },[])
  return (
    <Layout>
    <h1 className="text-center">Home Page</h1>
    <Row>
      {doctors && doctors.map((doctor) => 
        <DoctorList doctor={doctor}/>
      )}
    </Row>
    </Layout>
  )
}

export default HomePage;