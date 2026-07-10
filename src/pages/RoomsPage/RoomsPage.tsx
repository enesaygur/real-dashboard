import { useState } from "react";
import { useRooms } from "../../hooks/useRooms";

function RoomsPage() {
  const [page] = useState(1);
  const limit = 5;
  const { rooms, loading, isError } = useRooms(page, limit);
  if (loading) return <p>Loading rooms...</p>;
  if (isError) return <p>Rooms could not be loaded.</p>;
  return (
    <div>
      <h1>Rooms</h1>
      <pre>{JSON.stringify(rooms, null, 2)}</pre>
    </div>
  );
}

export default RoomsPage;
