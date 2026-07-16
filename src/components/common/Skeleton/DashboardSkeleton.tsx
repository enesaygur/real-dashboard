import CardSkeleton from "./CardSkeleton";
import Skeleton from "./Skeleton";

function DashboardSkeleton() {
  return (
    <div>
      <Skeleton width="250px" height="40px" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div style={{ margin: "40px" }}>
        <Skeleton width="100%" height="350px" />
      </div>
    </div>
  );
}

export default DashboardSkeleton;
