import styles from "./Skeleton.module.css";
interface SkeletonProps {
  width?: string;
  height?: string;
}
function Skeleton({ width, height }: SkeletonProps) {
  return <div className={styles.skeleton} style={{ width, height }} />;
}

export default Skeleton;
