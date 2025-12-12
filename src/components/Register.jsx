import React, { useState } from 'react'
import API from '../services/api'
import { setToken, setUser } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('candidate')
  const [err, setErr] = useState('')
  const nav = useNavigate()
  const submit = async (e)=>{
    e.preventDefault(); setErr('')
    try{
      const res = await API.post('/api/auth/register', { name, email, password, role })
      setToken(res.data.token); setUser(res.data.user); nav('/');
    }catch(e){ setErr(e.response?.data?.message || 'Register failed') }
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Register</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={submit}>
          <div className="mb-3"><input required placeholder="Full name" className="form-control" value={name} onChange={e=>setName(e.target.value)} /></div>
          <div className="mb-3"><input required placeholder="Email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div className="mb-3"><input required type="password" placeholder="Password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} /></div>
          <div className="mb-3">
            <select className="form-select" value={role} onChange={e=>setRole(e.target.value)}>
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  )
}
