import { useState, useEffect } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    title: "", description: "", location: "", salary: "", job_type: "FULL_TIME", company: ""
  });

  useEffect(() => {
    // Fetch companies owned by the current user
    API.get("companies/companies/").then(res => {
      setCompanies(res.data);
      if (res.data.length > 0) setForm(prev => ({ ...prev, company: res.data[0].id }));
    });
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.company) return alert("Please create a company first!");
    await API.post("jobs/create/", form);
    navigate("/my-jobs");
  };

  if (companies.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4">You haven't registered a company yet.</p>
        <Link to="/create-company" className="bg-blue-600 text-white px-4 py-2 rounded">Register Company</Link>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="company" className="w-full border p-2" onChange={handleChange} value={form.company}>
          {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input name="title" placeholder="Job Title" className="w-full border p-2" onChange={handleChange} required />
        <input name="location" placeholder="Location" className="w-full border p-2" onChange={handleChange} />
        <input name="salary" placeholder="Salary (e.g. $50k - $70k)" className="w-full border p-2" onChange={handleChange} />
        <select name="job_type" className="w-full border p-2" onChange={handleChange}>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="REMOTE">Remote</option>
        </select>
        <textarea name="description" placeholder="Job Description" className="w-full border p-2" rows="5" onChange={handleChange} required />
        <button className="w-full bg-blue-600 text-white py-2 rounded font-bold">Post Job</button>
      </form>
    </div>
  );
}