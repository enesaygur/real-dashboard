import type { Room } from "../../types/rooms";

interface RoomTableProps {
  rooms: Room[];
  sortField: "number" | "price" | "type";
  sortDirection: "asc" | "desc";
  onSort: (field: "number" | "price" | "type") => void;
  onView: (room: Room) => void;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
}
function RoomTable({
  rooms,
  onSort,
  onView,
  onEdit,
  onDelete,
}: RoomTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort("number")}>Number</th>
          <th onClick={() => onSort("type")}>Type</th>
          <th onClick={() => onSort("price")}>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr key={room.id}>
            <td>{room.number}</td>
            <td>{room.type}</td>
            <td>{room.price}</td>
            <td>{room.status}</td>
            <td>
              <button onClick={() => onView(room)}>View</button>
              <button onClick={() => onEdit(room)}>Edit</button>
              <button onClick={() => onDelete(room)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RoomTable;
