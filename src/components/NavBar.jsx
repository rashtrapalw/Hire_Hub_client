// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { getUser, logout } from '../utils/auth'

// export default function NavBar(){
//   const navigate = useNavigate();
//   const user = getUser();
//   const doLogout = () => { logout(); navigate('/login'); };
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">HireHub</Link>
//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item"><Link className="nav-link" to="/">Jobs</Link></li>
//             {user ? (
//               <>
//                 <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
//                 {(user.role === 'recruiter' || user.role === 'admin') && <li className="nav-item"><Link className="nav-link" to="/post-job">Post Job</Link></li>}
//                 <li className="nav-item"><button className="btn btn-link nav-link" onClick={doLogout}>Logout</button></li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
//                 <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }







import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../utils/auth'
import '../style/navbar.css'
import logo from '../assets/logo.png'
import logo2 from '../assets/logo2.png'

export default function NavBar() {
  const navigate = useNavigate()
  const user = getUser()

  const doLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light job-navbar sticky-top">
      <div className="container">

        {/* Brand */}
       <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="HireHub Logo"
            height="55"
            className="me-2"
          />
           <img
            src={logo2}
            alt="HireHub Logo"
            height="50"
            className="me-2"
          />
        </Link>


        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#jobNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="jobNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">Jobs</Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>

                {(user.role === 'recruiter' || user.role === 'admin') && (
                  <li className="nav-item ms-lg-2">
                    <Link className="btn btn-outline-primary btn-sm" to="/post-job">
                      Post Job
                    </Link>
                  </li>
                )}

                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={doLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-primary btn-sm" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  )
}
