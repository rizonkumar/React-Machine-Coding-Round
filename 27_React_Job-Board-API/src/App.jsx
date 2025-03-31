import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const JOB_API = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const JOB_DETAILS_API = "https://hacker-news.firebaseio.com/v0/item/";
const PER_PAGE = 6;

const App = () => {
  const [ids, setIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch job IDs on initial load
  const getJobIds = async () => {
    try {
      setLoading(true);
      const response = await axios.get(JOB_API);
      setIds(response.data);
    } catch (err) {
      setError("Failed to fetch job listings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch job details for a range of IDs
  const getJobDetails = async (start, end) => {
    if (start >= ids.length) return;

    try {
      setLoading(true);
      const idArr = ids.slice(start, end);

      const jobPromises = idArr.map((id) =>
        axios.get(`${JOB_DETAILS_API}${id}.json`).then((res) => res.data)
      );

      const newJobs = await Promise.all(jobPromises);
      setJobs((prevJobs) => [...prevJobs, ...newJobs]);
    } catch (err) {
      setError("Failed to fetch job details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load more jobs handler
  const loadMoreJobs = () => {
    getJobDetails(jobs.length, jobs.length + PER_PAGE);
  };

  // Initial data fetch
  useEffect(() => {
    getJobIds();
  }, []);

  // Fetch first page when IDs are loaded
  useEffect(() => {
    if (ids.length > 0 && jobs.length === 0) {
      getJobDetails(0, PER_PAGE);
    }
  }, [ids]);

  // Format date from Unix timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="job-board">
      <h1>Hacker News Jobs Board</h1>

      {error && <div className="error">{error}</div>}

      <div className="jobs-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h2>
              {job.url ? (
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.title}
                </a>
              ) : (
                job.title
              )}
            </h2>
            <p className="meta">
              By {job.by} · {formatDate(job.time)}
            </p>
            <div className="divider" />
          </div>
        ))}
      </div>

      {jobs.length > 0 && jobs.length < ids.length && (
        <button onClick={loadMoreJobs} disabled={loading} className="load-more">
          {loading ? "Loading..." : "Load more jobs"}
        </button>
      )}

      {loading && jobs.length === 0 && <div>Loading jobs...</div>}
    </div>
  );
};

export default App;
