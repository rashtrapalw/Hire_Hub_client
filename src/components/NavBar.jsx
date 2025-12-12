import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../utils/auth'

export default function NavBar(){
  const navigate = useNavigate();
  const user = getUser();
  const doLogout = () => { logout(); navigate('/login'); };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">HireHub</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Jobs</Link></li>
            {user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                {(user.role === 'recruiter' || user.role === 'admin') && <li className="nav-item"><Link className="nav-link" to="/post-job">Post Job</Link></li>}
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={doLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
