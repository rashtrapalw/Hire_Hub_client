import React, { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function JobForm(){
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const nav = useNavigate()
  const submit = async (e)=>{
    e.preventDefault()
    try{
      await API.post('/api/jobs', { title, company, description, location, salary })
      nav('/')
    }catch(e){ console.error(e) }
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h3>Post Job</h3>
        <form onSubmit={submit}>
          <input className="form-control mb-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
          <input className="form-control mb-2" placeholder="Company" value={company} onChange={e=>setCompany(e.target.value)} required />
          <textarea className="form-control mb-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
          <input className="form-control mb-2" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
          <input className="form-control mb-2" placeholder="Salary" value={salary} onChange={e=>setSalary(e.target.value)} />
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  )
}
