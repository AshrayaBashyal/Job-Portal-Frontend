import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateCompany() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Endpoint from your POST api/companies/companies/
      await API.post("companies/companies/", form);
      navigate("/create-job"); // Redirect to job creation after setup
    } catch (err) {
      setError("Failed to create company. Make sure the name is unique.");
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Register Your Company</h2>
      <p className="text-gray-600 mb-6 text-sm">You must register a company before posting jobs.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Company Name</label>
          <input name="name" className="w-full border p-2 rounded mt-1" onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" className="w-full border p-2 rounded mt-1" rows="4" onChange={handleChange} />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700">
          Create Company
        </button>
      </form>
    </div>
  );
}