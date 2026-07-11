import { useState } from "react";
import { useRooms } from "../../hooks/useRooms";
import type { Room } from "../../types/rooms";
import RoomTable from "../../components/rooms/RoomTable";
import Modal from "../../components/common/Modal/Modal";
import { toast } from "react-toastify";
import RoomForm from "./../../components/rooms/RoomForm";

function RoomsPage() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<"number" | "type" | "price">(
    "number",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const limit = 5;
  const {
    rooms,
    loading,
    isError,
    error,
    isFetching,
    total,
    createRoom,
    updateRoom,
    deleteRoom,
  } = useRooms(page, limit);
  const totalPages = Math.ceil(total / limit);
  const filteredRooms = rooms.filter(
    (room) =>
      room.number.toLowerCase().includes(search.toLocaleLowerCase()) ||
      room.type.toLowerCase().includes(search.toLocaleLowerCase()) ||
      room.price.toString().includes(search.toString()),
  );
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    const valueA = String(a[sortField]).toLocaleLowerCase();
    const valueB = String(b[sortField]).toLocaleLowerCase();
    if (sortDirection === "asc") {
      return valueA.localeCompare(valueB);
    }
    return valueB.localeCompare(valueA);
  });

  if (loading) return <p>Loading rooms...</p>;
  if (isError)
    return (
      <div>
        <h2>Something went wrong.</h2>
        <p>{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  return (
    <div>
      <h1>Rooms</h1>
      {isFetching && <p>Refreshing data...</p>}
      <button
        onClick={() => {
          setIsCreateModalOpen(true);
        }}
      >
        Create Room
      </button>
      <input
        type="text"
        placeholder="Search Rooms"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <RoomTable
        rooms={sortedRooms}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={(field) => {
          if (field === sortField) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
          } else {
            setSortField(field);
            setSortDirection("asc");
          }
        }}
        onView={(room) => {
          setSelectedRoom(room);
          setIsModalOpen(true);
        }}
        onEdit={(room) => setEditingRoom(room)}
        onDelete={(room) => setRoomToDelete(room)}
      />
      <Modal
        title="Room Details"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRoom(null);
        }}
      >
        {selectedRoom && (
          <div>
            <p>Number: {selectedRoom.number}</p>
            <p>Type: {selectedRoom.type}</p>
            <p>Price: {selectedRoom.price}</p>
            <p>Status : {selectedRoom.status}</p>
          </div>
        )}
      </Modal>
      <Modal
        title="Delete Room"
        isOpen={roomToDelete !== null}
        onClose={() => setRoomToDelete(null)}
      >
        <p>Are you sure you want to delete {roomToDelete?.number} room?</p>
        <button
          onClick={async () => {
            if (!roomToDelete) return;
            try {
              await deleteRoom(roomToDelete.id);
              toast.success("Room deleted successfully");
              const newTotalPages = Math.ceil((total - 1) / limit);
              if (page > newTotalPages) {
                setPage(newTotalPages);
              }
              setRoomToDelete(null);
            } catch {
              toast.error("Failed to delete room");
            }
          }}
        >
          Delete
        </button>
        <button onClick={() => setRoomToDelete(null)}>Cancel</button>
      </Modal>
      <Modal
        title="Create Room"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <RoomForm
          onSubmit={async (room) => {
            try {
              await createRoom(room);
              toast.success("Room created successfully");
              setIsCreateModalOpen(false);
            } catch {
              toast.error("Failed to create room");
            }
          }}
        />
      </Modal>
      <Modal
        isOpen={editingRoom !== null}
        title="Edit Room"
        onClose={() => setEditingRoom(null)}
      >
        {editingRoom && (
          <RoomForm
            initialValues={editingRoom}
            onSubmit={async (updatedRoom) => {
              try {
                await updateRoom({
                  id: editingRoom.id,
                  room: updatedRoom,
                });
                toast.success("Room updated successfully");
                setEditingRoom(null);
              } catch {
                toast.error("Failed to update room");
              }
            }}
          />
        )}
      </Modal>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          {page}/{totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RoomsPage;
