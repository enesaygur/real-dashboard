import { useDashboard } from "../../hooks/useDashboard";
import styles from "./NotificationCenter.module.css";

function NotificationCenter() {
  const { stats } = useDashboard("all");
  return (
    <div className={styles.panel}>
      <h3>NotificationCenter</h3>
      {stats?.activities.map((activity) => (
        <p key={activity.id} className={styles.item}>
          {activity.message}
        </p>
      ))}
    </div>
  );
}

export default NotificationCenter;
