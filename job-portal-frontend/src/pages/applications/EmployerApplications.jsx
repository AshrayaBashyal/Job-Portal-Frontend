import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function EmployerApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApps = () => {
    API.get("applications/employer/")
      .then(res => setApplications(res.data))
      .catch(err => console.error("Fetch Error:", err.response?.data));
  };

  useEffect(() => { fetchApps(); }, []);

  const updateStatus = async (id, status) => {
    try {
      // The 400 error is often due to status string casing or validation
      await API.patch(`applications/update/${id}/`, { status: status }); 
      fetchApps();
      alert(`Application ${status.toLowerCase()} successfully!`);
    } catch (err) {
      // Check the console to see exactly why the backend rejected it
      console.error("Update Failed:", err.response?.data);
      alert("Failed to update status. Check console for details.");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Received Applications</h2>
      {applications.length === 0 ? <p>No applications found.</p> : applications.map(app => (
        <div key={app.id} className="border p-4 mb-4 rounded flex justify-between items-center shadow-sm">
          <div>
            <p className="font-bold text-lg">{app.job_title}</p>
            <p className="text-sm text-gray-600">Applicant: {app.user_email}</p>
            <p className="text-xs font-mono mt-1">Status: <span className="uppercase">{app.status}</span></p>
          </div>
          <div className="space-x-2">
            <button 
              onClick={() => updateStatus(app.id, 'ACCEPTED')} 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition"
            >
              Accept
            </button>
            <button 
              onClick={() => updateStatus(app.id, 'REJECTED')} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}