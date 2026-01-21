// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import API from '../services/api'

// export default function JobList(){
//   const [jobs, setJobs] = useState([])
//   useEffect(()=>{ load() }, [])
//   const load = async ()=>{
//     try{ const res = await API.get('/api/jobs'); setJobs(res.data) }catch(e){ console.error(e) }
//   }
//   return (
//     <div>
//       <h3>Jobs</h3>
//       <div className="row">
//         {jobs.map(j=> (
//           <div className="col-md-6" key={j._id}>
//             <div className="card mb-3">
//               <div className="card-body">
//                 <h5>
//                   <Link to={`/jobs/${j._id}`} className="text-decoration-none">{j.title}</Link>
//                   <small className="text-muted"> @{j.company}</small>
//                 </h5>
//                 <p>{j.description}</p>
//                 <p className="mb-0"><strong>Location:</strong> {j.location}</p>
//                 <p className="mb-0"><strong>Salary:</strong> {j.salary}</p>
//                   <div className="mt-2"><Link to={`/jobs/${j._id}`} className="btn btn-sm btn-outline-primary">View</Link></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }




import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../services/api'
import '../style/JobList.css'

export default function JobList() {

  // Add this at the top of your file
    const jobPortals = [
      { name: 'Naukri', url: 'https://www.naukri.com', logo: '/logos/naukri.png' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs', logo: '/logos/linkedin.png' },
      { name: 'Indeed', url: 'https://www.indeed.com', logo: '/logos/indeed.png' },
      { name: 'Glassdoor', url: 'https://www.glassdoor.com/Job', logo: '/logos/glassdoor.jpg' },
      { name: 'Wellfound', url: 'https://wellfound.com', logo: '/logos/wellfound.png' },
      { name: 'foundit', url: 'https://www.foundit.in', logo: '/logos/foundit.png' },
      { name: 'shine', url: 'https://www.shine.com', logo: '/logos/shine.jpg' },  
    ]



  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])

  // filters
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [search, location, salary, jobs])

const loadJobs = async () => {
  try {
    const res = await API.get('/api/jobs')

    // ✅ newest jobs first
    const sortedJobs = res.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

    setJobs(sortedJobs)
    setFilteredJobs(sortedJobs)
  } catch (err) {
    console.error(err)
  }
}


  const applyFilters = () => {
    let temp = [...jobs]

    if (search) {
      temp = temp.filter(j =>
        j?.title?.toLowerCase().includes(search.toLowerCase()) ||
        j?.company?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (location) {
      temp = temp.filter(j =>
        j?.location?.toLowerCase().includes(location.toLowerCase())
      )
    }

    if (salary) {
      temp = temp.filter(j => Number(j?.salary) >= Number(salary))
    }

    setFilteredJobs(temp)
  }

  return (
    <div className="container my-5">

      {/* Page Heading */}
      <h2 className="fw-bold text-center mb-4">
        Find Your Next Job
      </h2>

{/* Filters */}
<div className="card filter-card shadow-sm mb-4">
  <div className="card-body py-2">
    <div className="row g-2">
      <div className="col-12 col-md-6">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="🔍 Job title or company"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="col-12 col-md-6">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="📍 Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>
    </div>
  </div>
</div>



      {/* Job Portal Logos */}
<div className="job-portal-bar mb-4 d-flex justify-content-center gap-3 flex-wrap">
  {jobPortals.map(portal => (
    <a
      key={portal.name}
      href={portal.url}
      target="_blank"
      rel="noopener noreferrer"
      className="portal-logo"
      title={`Go to ${portal.name}`}
    >
      <img
        src={portal.logo}
        alt={portal.name}
        style={{ width: '60px', height: '60px', objectFit: 'contain', cursor: 'pointer' }}
      />
    </a>
  ))}
</div>


      {/* Job List */}
      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(j => (
            <div className="col-lg-6 col-md-12" key={j._id}>
              <div className="job-card card shadow-sm mb-4">
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="fw-semibold mb-1">
                        <Link to={`/jobs/${j._id}`} className="job-title">
                          {j?.title}
                        </Link>
                      </h5>
                      <p className="text-muted mb-2">
                        {j?.company}
                      </p>
                    </div>

                    <span className="badge bg-primary-subtle text-primary">
                      Full Time
                    </span>
                  </div>

                  <p className="job-desc">
                    {j?.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="job-meta">
                      📍 {j?.location || 'NA'} &nbsp; | &nbsp;
                      💰 ₹{j?.salary || 'NA'}
                    </div>

                    <Link
                      to={`/jobs/${j._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      View Details
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            No jobs found
          </p>
        )}
      </div>
    </div>
  )
}
