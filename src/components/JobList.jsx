import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../services/api'

export default function JobList(){
  const [jobs, setJobs] = useState([])
  useEffect(()=>{ load() }, [])
  const load = async ()=>{
    try{ const res = await API.get('/api/jobs'); setJobs(res.data) }catch(e){ console.error(e) }
  }
  return (
    <div>
      <h3>Jobs</h3>
      <div className="row">
        {jobs.map(j=> (
          <div className="col-md-6" key={j._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5>
                  <Link to={`/jobs/${j._id}`} className="text-decoration-none">{j.title}</Link>
                  <small className="text-muted"> @{j.company}</small>
                </h5>
                <p>{j.description}</p>
                <p className="mb-0"><strong>Location:</strong> {j.location}</p>
                <p className="mb-0"><strong>Salary:</strong> {j.salary}</p>
                  <div className="mt-2"><Link to={`/jobs/${j._id}`} className="btn btn-sm btn-outline-primary">View</Link></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
