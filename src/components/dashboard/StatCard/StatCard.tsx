import styles from "./StatCard.module.css";
interface StatCardProps {
  title: string;
  value: number | string;
}
function StatCard({ title, value }: StatCardProps) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default StatCard;
