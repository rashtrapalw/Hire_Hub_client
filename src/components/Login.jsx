// import React, { useState } from 'react'
// import API from '../services/api'
// import { setToken, setUser } from '../utils/auth'
// import { useNavigate } from 'react-router-dom'

// export default function Login(){
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [err, setErr] = useState('')
//   const nav = useNavigate()
//   const submit = async (e)=>{
//     e.preventDefault(); setErr('')
//     try{
//       const res = await API.post('/api/auth/login', { email, password })
//       setToken(res.data.token); setUser(res.data.user); nav('/');
//     }catch(e){ setErr(e.response?.data?.message || 'Login failed') }
//   }
//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-6">
//         <h3>Login</h3>
//         {err && <div className="alert alert-danger">{err}</div>}
//         <form onSubmit={submit}>
//           <div className="mb-3"><input required placeholder="Email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} /></div>
//           <div className="mb-3"><input required type="password" placeholder="Password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} /></div>
//           <button className="btn btn-primary">Login</button>
//         </form>
//       </div>
//     </div>
//   )
// }





import React, { useState } from 'react'
import API from '../services/api'
import { setToken, setUser } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const res = await API.post('/api/auth/login', { email, password })
      setToken(res.data.token)
      setUser(res.data.user)
      nav('/')
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="container min-vh-100 d-flex align-items-top justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-5 col-lg-4">

          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">

              {/* HEADER */}
              <div className="text-center mb-4">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: 70, height: 70, fontSize: 28 }}
                >
                  🔐
                </div>
                <h4 className="fw-bold mb-1">Welcome Back</h4>
                <p className="text-muted small">
                  Login to access your dashboard
                </p>
              </div>

              {/* ERROR */}
              {err && (
                <div className="alert alert-danger py-2 text-center">
                  {err}
                </div>
              )}

              {/* FORM */}
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary btn-lg w-100 mt-2">
                  Login
                </button>
              </form>

              {/* FOOTER */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  © 2026 Job Portal. All rights reserved
                </small>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
