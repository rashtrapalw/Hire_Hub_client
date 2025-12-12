import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { getUser } from '../utils/auth'

export default function Dashboard(){
  const user = getUser()
  const [data, setData] = useState(null)
  useEffect(()=>{
    // Simple dashboard: fetch user's jobs or applications
    if(user?.role === 'recruiter') loadRecruiter()
    else if(user?.role === 'candidate') loadCandidate()
    else loadAdmin()
  },[])
  const loadRecruiter = async ()=>{
    try{ const res = await API.get('/api/jobs'); setData(res.data.filter(j=> j.recruiter && j.recruiter._id === user.id)) }catch(e){ console.error(e) }
  }
  const loadCandidate = async ()=>{
    try{ const res = await API.get('/api/jobs'); setData(res.data.filter(j=> j.applicants.some(a=> a.candidate === user.id || (a.candidate && a.candidate._id === user.id)))) }catch(e){ console.error(e) }
  }
  const loadAdmin = async ()=>{
    try{ const res = await API.get('/api/jobs'); setData(res.data) }catch(e){ console.error(e) }
  }
  return (
    <div>
      <h3>{user?.role?.toUpperCase()} Dashboard</h3>
      {data ? (
        <div className="row">
          {data.map(d => (
            <div key={d._id} className="col-md-6">
              <div className="card mb-3"><div className="card-body"><h5>{d.title}</h5><p>{d.company}</p></div></div>
            </div>
          ))}
        </div>
      ) : <p>Loading...</p>}
    </div>
  )
}
