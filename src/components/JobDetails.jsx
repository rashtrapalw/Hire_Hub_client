// import React, { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import API from '../services/api'
// import { getUser } from '../utils/auth'

// export default function JobDetails(){
//   const { id } = useParams()
//   const nav = useNavigate()
//   const [job, setJob] = useState(null)
//   const [resume, setResume] = useState(null)
//   const [msg, setMsg] = useState('')
//   const user = getUser()

//   useEffect(()=>{ load() }, [id])
//   const load = async ()=>{
//     try{ const res = await API.get(`/api/jobs/${id}`); setJob(res.data) }catch(e){ console.error(e) }
//   }

//   const submit = async (e)=>{
//     e.preventDefault();
//     if(!user){ nav('/login'); return }
//     try{
//       const fd = new FormData();
//       if(resume) fd.append('resume', resume);
//       const res = await API.post(`/api/jobs/${id}/apply`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//       setMsg(res.data.message || 'Applied');
//     }catch(e){ setMsg(e.response?.data?.message || 'Apply failed'); }
//   }

//   if(!job) return <p>Loading...</p>
//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-8">
//         <h3>{job.title} <small className="text-muted">@{job.company}</small></h3>
//         <p>{job.description}</p>
//         <p><strong>Location:</strong> {job.location} &nbsp; <strong>Salary:</strong> {job.salary}</p>
//         <hr />
//         <h5>Apply</h5>
//         {msg && <div className="alert alert-info">{msg}</div>}
//         <form onSubmit={submit}>
//           <div className="mb-3">
//             <label className="form-label">Resume (PDF / DOC)</label>
//             <input type="file" className="form-control" accept=".pdf,.doc,.docx" onChange={e=>setResume(e.target.files[0])} />
//           </div>
//           <button className="btn btn-primary">Submit Application</button>
//         </form>
//         <hr />
//         <h6>Applicants</h6>
//         {job.applicants && job.applicants.length ? (
//           <ul className="list-group">
//             {job.applicants.map(a => (
//               <li className="list-group-item" key={a._id}>
//                 {a.candidate ? (a.candidate.name || a.candidate.email) : 'Candidate'} - {a.status}
//                 {a.resumePath && <a className="btn btn-sm btn-link" href={a.resumePath} target="_blank" rel="noreferrer">View Resume</a>}
//               </li>
//             ))}
//           </ul>
//         ) : <p>No applicants yet.</p>}
//       </div>
//     </div>
//   )
// }



import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../services/api'
import { getUser } from '../utils/auth'


export default function JobDetails() {
  const { id } = useParams()
  const nav = useNavigate()
  const [job, setJob] = useState(null)
  const [resume, setResume] = useState(null)
  const [msg, setMsg] = useState('')
  const user = getUser()

  useEffect(() => { load() }, [id])

  const load = async () => {
    try {
      const res = await API.get(`/api/jobs/${id}`)
      setJob(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!user) { nav('/login'); return }

    try {
      const fd = new FormData()
      if (resume) fd.append('resume', resume)

      const res = await API.post(`/api/jobs/${id}/apply`, fd)
      setMsg(res.data.message || 'Applied successfully')
    } catch (e) {
      setMsg(e.response?.data?.message || 'Apply failed')
    }
  }

  if (!job) return <p>Loading...</p>

  return (
    <div className="container">
      <h3>{job.title} <small className="text-muted">@{job.company}</small></h3>
      <p>{job.description}</p>
      <p><strong>Location:</strong> {job.location} | <strong>Salary:</strong> ₹{job.salary}</p>

      <hr />

      <h5>Apply for this job</h5>
      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={submit}>
        <input
          type="file"
          className="form-control mb-2"
          accept=".pdf,.doc,.docx"
          onChange={e => setResume(e.target.files[0])}
        />
        <button className="btn btn-primary">Apply</button>
      </form>
    </div>
  )
}
