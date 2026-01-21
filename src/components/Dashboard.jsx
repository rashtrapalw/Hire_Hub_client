// import React, { useEffect, useState } from 'react'
// import API from '../services/api'
// import { getUser } from '../utils/auth'

// export default function Dashboard(){
//   const user = getUser()
//   const [data, setData] = useState(null)
//   useEffect(()=>{
//     // Simple dashboard: fetch user's jobs or applications
//     if(user?.role === 'recruiter') loadRecruiter()
//     else if(user?.role === 'candidate') loadCandidate()
//     else loadAdmin()
//   },[])
//   const loadRecruiter = async ()=>{
//     try{ const res = await API.get('/api/jobs'); setData(res.data.filter(j=> j.recruiter && j.recruiter._id === user.id)) }catch(e){ console.error(e) }
//   }
//   const loadCandidate = async ()=>{
//     try{ const res = await API.get('/api/jobs'); setData(res.data.filter(j=> j.applicants.some(a=> a.candidate === user.id || (a.candidate && a.candidate._id === user.id)))) }catch(e){ console.error(e) }
//   }
//   const loadAdmin = async ()=>{
//     try{ const res = await API.get('/api/jobs'); setData(res.data) }catch(e){ console.error(e) }
//   }
//   return (
//     <div>
//       <h3>{user?.role?.toUpperCase()} Dashboard</h3>
//       {data ? (
//         <div className="row">
//           {data.map(d => (
//             <div key={d._id} className="col-md-6">
//               <div className="card mb-3"><div className="card-body"><h5>{d.title}</h5><p>{d.company}</p></div></div>
//             </div>
//           ))}
//         </div>
//       ) : <p>Loading...</p>}
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { getUser } from '../utils/auth'

export default function Dashboard() {
  const user = getUser()
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    if (user?.role === 'recruiter') loadRecruiter()
    else if (user?.role === 'candidate') loadCandidate()
  }, [])

  const loadRecruiter = async () => {
    try {
      const res = await API.get('/api/jobs')
      const myJobs = res.data.filter(
        j => j.recruiter && j.recruiter._id === user.id
      )
      setJobs(myJobs)
    } catch (e) {
      console.error(e)
    }
  }

  const loadCandidate = async () => {
    try {
      const res = await API.get('/api/jobs')
      const appliedJobs = res.data.filter(j =>
        j.applicants.some(a =>
          a.candidate === user.id ||
          a?.candidate?._id === user.id
        )
      )
      setJobs(appliedJobs)
    } catch (e) {
      console.error(e)
    }
  }

  // 🔥 NEW: update applicant status
  const updateStatus = async (jobId, applicantId, status) => {
    try {
      await API.put(
        `/api/jobs/${jobId}/applicants/${applicantId}/status`,
        { status }
      )
      loadRecruiter() // refresh recruiter data
    } catch (e) {
      console.error(e)
    }
  }

  const getStatusClass = (status) => {
  switch (status) {
    case 'hired':
      return 'bg-success'
    case 'rejected':
      return 'bg-danger'
    case 'reviewing':
      return 'bg-warning text-dark'
    default:
      return 'bg-primary'
  }
}
  

  if (!user) return <p>Loading...</p>

  return (
    <div className="container">
      <h3>{user.role.toUpperCase()} Dashboard</h3>

      {/* USER INFO */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>{user.name}</h5>
          <p className="mb-0">{user.email}</p>
        </div>
      </div>

      {/* ================= RECRUITER VIEW ================= */}
      {user.role === 'recruiter' && jobs.map(job => (
        <div key={job._id} className="card mb-3">
          <div className="card-body">
            <h5>{job.title}</h5>
            <p>{job.company}</p>

            <h6>Applicants</h6>
            {job.applicants.length ? (
              <ul className="list-group">
                {job.applicants.map(a => (
                  <li
                    key={a._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{a.candidate?.name}</strong>
                      <br />
                      <small>{a.candidate?.email}</small>
                      <br />
                      <small>Status: {a.status}</small>

                      {a.resumePath && (
                        <a
                          href={a.resumePath}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-link"
                        >
                          Resume
                        </a>
                      )}
                    </div>

                    {/* STATUS DROPDOWN */}
                    <select
                      className="form-select form-select-sm w-auto"
                      value={a.status}
                      onChange={(e) =>
                        updateStatus(job._id, a._id, e.target.value)
                      }
                    >
                      <option value="applied">Applied</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applicants yet</p>
            )}
          </div>
        </div>
      ))}

      {/* ================= CANDIDATE VIEW ================= */}
        {user.role === 'candidate' && jobs.map(job => {
          const myApplication = job.applicants.find(
            a => a.candidate === user.id || a?.candidate?._id === user.id
          )

          return (
            <div key={job._id} className="card mb-2">
              <div className="card-body">
                <h5>{job.title}</h5>
                <p>{job.company}</p>

                {/* STATUS BADGE */}
                <span className={`badge ${getStatusClass(myApplication?.status)}`}>
                  {myApplication?.status || 'Applied'}
                </span>
              </div>
            </div>
          )
        })}

    </div>
  )
}
