import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../componemts/Layout';
import axios from 'axios';
import { message } from 'antd';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = useCallback(async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    };
  }, []);

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post('/api/v1/admin/changeAccountStatus',
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error('something went wrong')
    }
  }

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  const columns = [
    {
      title: 'Name',
      dataIndex: "name",
      render: (text, record) =>
        <span>{record.firstName} {record.lastName}</span>,
    },
    {
      title: 'Status',
      dataIndex: "status",
    },
    {
      title: 'phone',
      dataIndex: "phone",
    },
    {
      title: 'Actions',
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'panding' ?
            (<button className="btn btn-success" onClick={() => handleAccountStatus(record, "approved")}>approve</button>
            ) :
            (<button className='btn btn-danger'> rejetct </button>
            )}
        </div>
      )
    }
  ]

  return (
    <Layout>
      <h1> All Doctors</h1>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.dataIndex}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              {columns.map((col) => (
                <td key={col.dataIndex}>{col.render ? col.render(doctor[col.dataIndex], doctor) : doctor[col.dataIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Doctors;
