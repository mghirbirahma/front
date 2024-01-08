import './App.css';
import {BrowserRouter,Routes,Route}from 'react-router-dom';
import HomePage from './pages/HomePage'
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './componemts/Spinner';
import ApplyDoctor from './pages/ApplyDoctor';
import ProtectedRoute from './componemts/ProtectedRoute';
import PublicRoute from './componemts/PublicRoute';
import Users from './pages/admin/Users';
import NotificationPage from './pages/NotificationPage';
import Doctors from './pages/admin/Doctors';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import Profile from './pages/doctor/Profile';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
function App() {
  const{loading}=useSelector(state=>state.alerts)
  return (
    < >
      <BrowserRouter> 
      {loading ? (
        <Spinner />):
     (
      <Routes> 
          <Route 
            path ="/"
            element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }
          />
          <Route 
            path ="/login"
            element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }
          />
          <Route 
            path ="/apply-doctor"
            element={
            <ProtectedRoute>
              <ApplyDoctor/>
            </ProtectedRoute>
          }
          />
          <Route 
            path ="/admin/doctors"
            element={
            <ProtectedRoute>
              <Doctors/>
            </ProtectedRoute>
          }
          />
          <Route 
            path ="/admin/users"
            element={
            <ProtectedRoute>
              <Users/>
            </ProtectedRoute>
          }
          />
          <Route 
            path ="/notification"
            element={
            <ProtectedRoute>
              <NotificationPage/>
            </ProtectedRoute>
          }
          />
          <Route 
            path ="/doctor/book-appointment/:doctorId"
            element={
            <ProtectedRoute>
              <BookingPage/>
            </ProtectedRoute>
          }
          />
          <Route 
            path ="/appointments"
            element={
            <ProtectedRoute>
              <Appointments/>
            </ProtectedRoute>
          }
          />
           <Route 
            path ="/doctor-appointments"
            element={
            <ProtectedRoute>
              <DoctorAppointments/>
            </ProtectedRoute>
          }
          />
          <Route 
            path ="/register"
            element={
            <PublicRoute>
              <Register/>
            </PublicRoute>
          }
          />
          <Route 
            path ="/doctor/profile/:id"
            element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
          />
      </Routes>
     )}
      </BrowserRouter> 
    </>
  );
}

export default App;
