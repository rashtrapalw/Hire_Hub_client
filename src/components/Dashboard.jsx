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
import '../style/Dashboard.css'

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
        j.applicants.some(
          a => a.candidate === user.id || a?.candidate?._id === user.id
        )
      )
      setJobs(appliedJobs)
    } catch (e) {
      console.error(e)
    }
  }

  // 🔥 Recruiter updates applicant status
  const updateStatus = async (jobId, applicantId, status) => {
    try {
      await API.put(
        `/api/jobs/${jobId}/applicants/${applicantId}/status`,
        { status }
      )
      loadRecruiter()
    } catch (e) {
      console.error(e)
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'hired':
        return 'badge-hired'
      case 'rejected':
        return 'badge-rejected'
      case 'reviewing':
        return 'badge-reviewing'
      default:
        return 'badge-applied'
    }
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="dashboard py-4">
      <div className="container">
        <div className="row">

          {/* ================= PROFILE PANEL ================= */}
          <div className="col-md-4 mb-4">
            <div className="card profile-card shadow-sm">
              <div className="card-body text-center">
                <div className="profile-avatar mb-3">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h5 className="mb-1">{user.name}</h5>
                <p className="mb-2">{user.email}</p>
                <span className="badge bg-dark text-capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="col-md-8">

            {/* ================= RECRUITER VIEW ================= */}
            {user.role === 'recruiter' && (
              <>
                <h4 className="section-title">My Posted Jobs</h4>

                {jobs.length === 0 && (
                  <p className="text-muted">No jobs posted yet</p>
                )}

                {jobs.map(job => (
                  <div key={job._id} className="card job-card shadow-sm mb-4">
                    <div className="card-body">

                      {/* Job Header */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h5 className="mb-0">{job.title}</h5>
                          <small className="text-muted">{job.company}</small>
                        </div>
                        <span className="badge bg-secondary">
                          {job.applicants.length} Applicants
                        </span>
                      </div>

                      {/* Applicants */}
                      {job.applicants.length ? (
                        job.applicants.map(a => (
                          <div key={a._id} className="applicant-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{a.candidate?.name}</strong>
                              <br />
                              <small>{a.candidate?.email}</small>
                              <br />
                              <span className={`badge-status ${getStatusClass(a.status)}`}>
                                {a.status}
                              </span>

                              {a.resumePath && (
                                <a
                                  href={a.resumePath}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-sm btn-outline-primary ms-2"
                                >
                                  Resume
                                </a>
                              )}
                            </div>

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
                          </div>
                        ))
                      ) : (
                        <p className="text-muted">No applicants yet</p>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* ================= CANDIDATE VIEW ================= */}
            {user.role === 'candidate' && (
              <>
                <h4 className="section-title">Applied Jobs</h4>

                {jobs.length === 0 && (
                  <p className="text-muted">You haven’t applied to any jobs</p>
                )}

                {jobs.map(job => {
                  const myApplication = job.applicants.find(
                    a => a.candidate === user.id || a?.candidate?._id === user.id
                  )

                  return (
                    <div key={job._id} className="card job-card shadow-sm mb-3">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="mb-1">{job.title}</h5>
                          <small className="text-muted">{job.company}</small>
                        </div>

                        <span className={`badge-status ${getStatusClass(myApplication?.status)}`}>
                          {myApplication?.status || 'Applied'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
