import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get("applications/my/")
      .then(res => setApps(res.data))
      .catch(err => console.error("Error loading applications", err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>
      <div className="space-y-4">
        {apps.map(app => (
          <div key={app.id} className="border p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{app.job_title}</h3>
              <p className="text-gray-600">{app.company_name}</p>
            </div>
            <span className={`px-3 py-1 rounded text-sm font-bold ${
              app.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : 
              app.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}