import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function EmployerApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApps = () => {
    API.get("applications/employer/").then(res => setApplications(res.data));
  };

  useEffect(() => { fetchApps(); }, []);

  const updateStatus = async (id, status) => {
    await API.patch(`applications/update/${id}/`, { status });
    fetchApps(); // Refresh list after update
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Received Applications</h2>
      {applications.map(app => (
        <div key={app.id} className="border p-4 mb-4 rounded flex justify-between">
          <div>
            <p className="font-bold">{app.job_title}</p>
            <p className="text-sm">Applicant: {app.user_email}</p>
            <p className="text-xs text-gray-500 font-mono">Current Status: {app.status}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => updateStatus(app.id, 'ACCEPTED')} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Accept</button>
            <button onClick={() => updateStatus(app.id, 'REJECTED')} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}