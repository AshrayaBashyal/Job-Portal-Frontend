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
      // Backend expects: 'APPLIED', 'REVIEWING', 'INTERVIEW', 'REJECTED', or 'HIRED'
      await API.patch(`applications/update/${id}/`, { status: status }); 
      fetchApps();
      alert(`Application marked as ${status} successfully!`);
    } catch (err) {
      console.error("Update Failed:", err.response?.data);
      alert(`Error: ${err.response?.data?.error || "Failed to update status"}`);
    }
  };

  // Helper to get status badge colors
  const getStatusStyle = (status) => {
    switch (status) {
      case 'HIRED': return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      case 'INTERVIEW': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'REVIEWING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Received Applications</h2>
      
      {applications.length === 0 ? (
        <div className="text-center p-10 border-2 border-dashed rounded-lg">
          <p className="text-gray-500">No applications received yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white border p-5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition">
              <div className="mb-4 md:mb-0">
                <h3 className="font-bold text-xl text-indigo-900">{app.job_title}</h3>
                <p className="text-sm text-gray-600 mb-2">Applicant: <span className="font-medium text-gray-900">{app.user_email}</span></p>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${getStatusStyle(app.status)}`}>
                  {app.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => updateStatus(app.id, 'REVIEWING')} 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm font-medium transition"
                >
                  Review
                </button>
                <button 
                  onClick={() => updateStatus(app.id, 'INTERVIEW')} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition"
                >
                  Interview
                </button>
                <button 
                  onClick={() => updateStatus(app.id, 'HIRED')} 
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm font-medium transition"
                >
                  Hire
                </button>
                <button 
                  onClick={() => updateStatus(app.id, 'REJECTED')} 
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-medium transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}