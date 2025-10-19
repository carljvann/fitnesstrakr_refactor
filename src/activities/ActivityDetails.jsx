import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

const API = import.meta.env.VITE_API;

/** Displays details for a single activity */
export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching activity with ID:", id);
        console.log("API URL:", API);
        console.log("Full URL:", `${API}/activities/${id}`);

        const response = await fetch(`${API}/activities/${id}`);
        console.log("Response status:", response.status);
        const result = await response.json();
        console.log("Result:", result);

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch activity");
        }

        setActivity(result);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  const tryDelete = async () => {
    setDeleteError(null);

    try {
      await deleteActivity(token, id);
      navigate("/activities");
    } catch (err) {
      setDeleteError(err.message);
    }
  };

  if (loading) {
    return <p>Loading activity details...</p>;
  }

  if (error) {
    return (
      <div>
        <p role="alert">Error: {error}</p>
        <Link to="/activities">Back to Activities</Link>
      </div>
    );
  }

  if (!activity) {
    return (
      <div>
        <p>Activity not found</p>
        <Link to="/activities">Back to Activities</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>
        <strong>Description:</strong> {activity.description}
      </p>
      <p>
        <strong>Creator ID:</strong> {activity.creatorId}
      </p>

      {token && (
        <>
          <button onClick={tryDelete}>Delete Activity</button>
          {deleteError && <p role="alert">{deleteError}</p>}
        </>
      )}

      <Link to="/activities">Back to Activities</Link>
    </div>
  );
}
