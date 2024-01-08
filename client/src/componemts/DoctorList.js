import React from 'react'
import { useNavigate } from 'react-router-dom'
const DoctorList = ({doctor}) => {
    const navigate=useNavigate()
    return (
        <>
    
    <div className="card m-2" 
    style={{ cursor: "pointer" }}
    onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>

            <div className="card-header">
                 dr.{doctor.firstName} {doctor.lastName}
            </div>
        </div>
        <div className='card-body'>
            <p>
                <b>Specialization</b> {doctor.specialization}
            </p>
            <p>
                <b>Experience</b> {doctor.experience}
            </p>
            <p>
                <b>Fees Per Consultation </b> {doctor.feesPerConsultation}
            </p>
            <p>
                <b>Timmings</b> {doctor.timmings[0]}-{doctor.timmings[1]}
            </p>
        </div>
        </>
      )
}

export default DoctorList;