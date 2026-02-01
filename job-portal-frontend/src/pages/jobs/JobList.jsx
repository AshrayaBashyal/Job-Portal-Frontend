import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("jobs/")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
