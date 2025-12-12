import React, { useState } from 'react'
import API from '../services/api'
import { setToken, setUser } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()
  const submit = async (e)=>{
    e.preventDefault(); setErr('')
    try{
      const res = await API.post('/api/auth/login', { email, password })
      setToken(res.data.token); setUser(res.data.user); nav('/');
    }catch(e){ setErr(e.response?.data?.message || 'Login failed') }
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Login</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={submit}>
          <div className="mb-3"><input required placeholder="Email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div className="mb-3"><input required type="password" placeholder="Password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} /></div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  )
}
