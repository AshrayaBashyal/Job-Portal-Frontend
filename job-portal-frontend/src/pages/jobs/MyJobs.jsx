import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("jobs/my/").then(res => setJobs(res.data));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">My Posted Jobs</h2>
      {jobs.map(job => (
        <div key={job.id} className="border p-4 mb-2 rounded shadow-sm">
          <h3 className="font-bold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.location} • {job.job_type}</p>
        </div>
      ))}
    </div>
  );
}