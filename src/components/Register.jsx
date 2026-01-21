// import React, { useState } from 'react'
// import API from '../services/api'
// import { setToken, setUser } from '../utils/auth'
// import { useNavigate } from 'react-router-dom'

// export default function Register(){
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [role, setRole] = useState('candidate')
//   const [err, setErr] = useState('')
//   const nav = useNavigate()
//   const submit = async (e)=>{
//     e.preventDefault(); setErr('')
//     try{
//       const res = await API.post('/api/auth/register', { name, email, password, role })
//       setToken(res.data.token); setUser(res.data.user); nav('/');
//     }catch(e){ setErr(e.response?.data?.message || 'Register failed') }
//   }
//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-6">
//         <h3>Register</h3>
//         {err && <div className="alert alert-danger">{err}</div>}
//         <form onSubmit={submit}>
//           <div className="mb-3"><input required placeholder="Full name" className="form-control" value={name} onChange={e=>setName(e.target.value)} /></div>
//           <div className="mb-3"><input required placeholder="Email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} /></div>
//           <div className="mb-3"><input required type="password" placeholder="Password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} /></div>
//           <div className="mb-3">
//             <select className="form-select" value={role} onChange={e=>setRole(e.target.value)}>
//               <option value="candidate">Candidate</option>
//               <option value="recruiter">Recruiter</option>
//             </select>
//           </div>
//           <button className="btn btn-primary">Register</button>
//         </form>
//       </div>
//     </div>
//   )
// }




import React, { useState } from 'react'
import API from '../services/api'
import { setToken, setUser } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('candidate')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const res = await API.post('/api/auth/register', {
        name,
        email,
        password,
        role
      })
      setToken(res.data.token)
      setUser(res.data.user)
      nav('/')
    } catch (e) {
      setErr(e.response?.data?.message || 'Register failed')
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
                  className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: 70, height: 70, fontSize: 28 }}
                >
                  📝
                </div>
                <h4 className="fw-bold mb-1">Create Account</h4>
                <p className="text-muted small">
                  Register to start applying for jobs
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
                    Full Name
                  </label>
                  <input
                    required
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Email Address
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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Register As
                  </label>
                  <select
                    className="form-select form-select-lg"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="candidate">Candidate</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                </div>

                <button className="btn btn-success btn-lg w-100 mt-2">
                  Register
                </button>
              </form>

              {/* FOOTER */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  Already have an account? Login instead
                </small>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
