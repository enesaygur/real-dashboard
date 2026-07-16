import Skeleton from "./Skeleton";

function CardSkeleton() {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Skeleton width="50%" height="20px" />
      <div style={{ marginTop: "15px" }}>
        <Skeleton width="80%" height="35px" />
      </div>
    </div>
  );
}

export default CardSkeleton;
