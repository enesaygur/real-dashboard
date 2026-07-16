import Skeleton from "./Skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}
function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <Skeleton key={columnIndex} width="100%" height="40px" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;
