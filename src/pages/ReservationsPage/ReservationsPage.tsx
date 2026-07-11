import { useState } from "react";
import { useReserations } from "../../hooks/useReservations";

function ReservationsPage() {
  const [page] = useState(1);
  const limit = 5;
  const { reservations, loading, isError, error, isFetching } = useReserations(
    page,
    limit,
  );
  if (loading) return <p>Loading reservations...</p>;
  if (isError) return <p>Reservations could not be loaded.</p>;
  return (
    <div>
      <h1>Reservations</h1>
      <pre>{JSON.stringify(reservations, null, 2)}</pre>
    </div>
  );
}

export default ReservationsPage;
