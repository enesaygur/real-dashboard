import type { Reservation } from "../../types/reservation";

interface ReservationTableProps {
  reservations: Reservation[];
  sortField: "guestName" | "roomNumber" | "checkIn";
  sortDirection: "asc" | "desc";
  onSort: (field: "guestName" | "roomNumber" | "checkIn") => void;
  onView: (reservation: Reservation) => void;
  onEdit: (reservation: Reservation) => void;
  onDelete: (reservation: Reservation) => void;
}
function ReservationTable({
  reservations,
  onSort,
  onView,
  onEdit,
  onDelete,
}: ReservationTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort("guestName")}>Guest Name</th>
          <th onClick={() => onSort("roomNumber")}>Room Number</th>
          <th onClick={() => onSort("checkIn")}>Check-in Date</th>
          <th>Check-out Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td>{reservation.guestName}</td>
            <td>{reservation.roomNumber}</td>
            <td>{reservation.checkIn}</td>
            <td>{reservation.checkOut}</td>
            <td>{reservation.status}</td>
            <td>
              <button onClick={() => onView(reservation)}>View</button>
              <button onClick={() => onEdit(reservation)}>Edit</button>
              <button onClick={() => onDelete(reservation)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReservationTable;
