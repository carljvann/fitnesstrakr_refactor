import { Link } from "react-router-dom";

export default function ActivityList({ activities, syncActivities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          syncActivities={syncActivities}
        />
      ))}
    </ul>
  );
}

function ActivityListItem({ activity, syncActivities }) {
  return (
    <li>
      <Link to={`/activities/${activity.id}`}>
        <p>{activity.name}</p>
      </Link>
    </li>
  );
}
