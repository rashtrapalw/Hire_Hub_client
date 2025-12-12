import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import JobList from './components/JobList'
import JobDetails from './components/JobDetails'
import JobForm from './components/JobForm'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import { getUser } from './utils/auth'

const PrivateRoute = ({ children, roles }) => {
  const user = getUser();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/post-job" element={<PrivateRoute roles={["recruiter","admin"]}><JobForm /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  )
}
