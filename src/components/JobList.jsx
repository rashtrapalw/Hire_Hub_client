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

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])

  // filter states
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
      setJobs(res.data)
      setFilteredJobs(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  const applyFilters = () => {
    let temp = [...jobs]

    // search by title or company
    if (search) {
      temp = temp.filter(j =>
        j?.title?.toLowerCase().includes(search.toLowerCase()) ||
        j?.company?.toLowerCase().includes(search.toLowerCase())
      )
    }

    // filter by location
    if (location) {
      temp = temp.filter(j =>
        j?.location?.toLowerCase().includes(location.toLowerCase())
      )
    }

    // filter by minimum salary
    if (salary) {
      temp = temp.filter(j =>
        Number(j?.salary) >= Number(salary)
      )
    }

    setFilteredJobs(temp)
  }

  return (
    <div className="container">
      <h3 className="mb-3">Jobs</h3>

      {/* Search & Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or company"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Minimum salary"
            value={salary}
            onChange={e => setSalary(e.target.value)}
          />
        </div>
      </div>

      {/* Job List */}
      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(j => (
            <div className="col-md-6" key={j._id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5>
                    <Link
                      to={`/jobs/${j._id}`}
                      className="text-decoration-none"
                    >
                      {j?.title}
                    </Link>
                    <small className="text-muted"> @{j?.company}</small>
                  </h5>

                  <p>{j?.description}</p>
                  <p className="mb-0">
                    <strong>Location:</strong> {j?.location || 'NA'}
                  </p>
                  <p className="mb-0">
                    <strong>Salary:</strong> ₹{j?.salary || 'NA'}
                  </p>

                  <div className="mt-2">
                    <Link
                      to={`/jobs/${j._id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  )
}
