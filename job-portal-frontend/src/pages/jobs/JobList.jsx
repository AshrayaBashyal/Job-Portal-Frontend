import { useEffect, useState, useContext } from "react";
import API from "../../api/axios";
import { AuthContext } from "../../auth/AuthContext";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get("jobs/")
      .then(res => setJobs(res.data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  const applyToJob = async (jobId) => {
    try {
      await API.post("applications/apply/", { job: jobId });
      alert("Applied successfully!");
    } catch (err) {
      alert("Application failed. You might have already applied.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.description}</p>

            {/* FIX: Ensure "CANDIDATE" matches your API's uppercase response */}
            {user?.role === "CANDIDATE" && (
              <button
                onClick={() => applyToJob(job.id)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Apply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}