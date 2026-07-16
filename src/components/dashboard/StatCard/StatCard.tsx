import styles from "./StatCard.module.css";
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}
function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <h3>{title}</h3>
      </div>
      <h2>{value}</h2>
    </div>
  );
}

export default StatCard;
