import { useState } from "react";
import { useReserations } from "../../hooks/useReservations";
import type { Reservation } from "../../types/reservation";
import ReservationTable from "../../components/reservations/ReservationTable";
import Modal from "../../components/common/Modal/Modal";
import ReservationForm from "../../components/reservations/ReservationForm";
import { toast } from "react-toastify";
import TableSkeleton from "../../components/common/Skeleton/TableSkeleton";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { exportToCsv } from "../../utils/csv";
import { exportToExcel } from "../../utils/excel";

function ReservationsPage() {
  const [search, setSearch] = useLocalStorage("reservations-search", "");
  const [page, setPage] = useLocalStorage("reservations-page", 1);
  const [sortField, setSortField] = useLocalStorage<
    "guestName" | "roomNumber" | "checkIn"
  >("reservations-sort-field", "guestName");
  const [sortDirection, setSortDirection] = useLocalStorage<"asc" | "desc">(
    "reservations-sort-direction",
    "asc",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [reservationToDelete, setReservationToDelete] =
    useState<Reservation | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);
  const limit = 5;
  const {
    reservations,
    loading,
    isError,
    error,
    isFetching,
    total,
    deleteReservation,
    updateReservation,
    createReservation,
  } = useReserations(page, limit);
  const totalPages = Math.ceil(total / limit);
  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.guestName.toLowerCase().includes(search.toLowerCase()) ||
      reservation.roomNumber.toLowerCase().includes(search.toLowerCase()) ||
      reservation.checkIn.toLowerCase().includes(search.toLowerCase()),
  );
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    const valueA = a[sortField].toLocaleLowerCase();
    const valueB = b[sortField].toLocaleLowerCase();
    if (sortDirection === "asc") {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });
  if (loading) return <TableSkeleton rows={5} columns={4} />;
  if (isError)
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{error instanceof Error && error.message}</p>
      </div>
    );
  return (
    <div>
      <h1>Reservations</h1>
      {isFetching && <p>Refreshing reservations...</p>}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setIsCreateModalOpen(true)}>
          Create Reservation
        </button>
        <button
          disabled={sortedReservations.length === 0}
          onClick={() => {
            exportToCsv("reservations", sortedReservations);
            toast.success("Reservations exported to CSV");
          }}
        >
          Export CSV
        </button>
        <button disabled={sortedReservations.length === 0}
          onClick={() => {
            exportToExcel("reservations", sortedReservations);
            toast.success("Reservations exported to Excel");
          }}
        >Export Excel</button>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ReservationTable
        reservations={sortedReservations}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={(field) => {
          if (field === sortField) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
          } else {
            setSortField(field);
            setSortDirection("asc");
          }
        }}
        onView={(reservation) => {
          setSelectedReservation(reservation);
          setIsModalOpen(true);
        }}
        onEdit={(reservation) => setEditingReservation(reservation)}
        onDelete={(reservation) => setReservationToDelete(reservation)}
      />
      <Modal
        title="Reservation Details"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedReservation && (
          <>
            <p>
              <strong>Guest Name:</strong> {selectedReservation.guestName}
            </p>
            <p>
              <strong>Room Number:</strong> {selectedReservation.roomNumber}
            </p>
            <p>
              <strong>Check-in Date:</strong> {selectedReservation.checkIn}
            </p>
            <p>
              <strong>Check-out Date:</strong> {selectedReservation.checkOut}
            </p>
            <p>
              <strong>Status:</strong> {selectedReservation.status}
            </p>
          </>
        )}
      </Modal>
      <Modal
        title="Create Reservation"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <ReservationForm
          onSubmit={async (reservation) => {
            try {
              await createReservation(reservation);
              toast.success("Reservation created successfully");
              setIsCreateModalOpen(false);
            } catch {
              toast.error("Failed to create reservation");
            }
          }}
        />
      </Modal>
      <Modal
        title="Edit Reservation"
        isOpen={editingReservation !== null}
        onClose={() => setEditingReservation(null)}
      >
        {editingReservation && (
          <ReservationForm
            initialValues={editingReservation}
            onSubmit={async (reservation) => {
              try {
                await updateReservation({
                  id: editingReservation.id,
                  reservation: reservation,
                });
                toast.success("Reservation updated successfully");
                setEditingReservation(null);
              } catch {
                toast.error("Failed to update reservation");
              }
            }}
          />
        )}
      </Modal>
      <Modal
        title="Delete Reservation"
        isOpen={reservationToDelete !== null}
        onClose={() => setReservationToDelete(null)}
      >
        <p>Are you sure you want to delete this reservation?</p>
        <button
          onClick={async () => {
            if (!reservationToDelete) return;
            try {
              await deleteReservation(reservationToDelete.id);
              toast.success("Reservation deleted successfully");
              const newTotalPages = Math.ceil((total - 1) / limit);
              if (page > newTotalPages) {
                setPage(newTotalPages);
              }
              setReservationToDelete(null);
            } catch {
              toast.error("Failed to delete reservation");
            }
          }}
        >
          Delete
        </button>
        <button onClick={() => setReservationToDelete(null)}>Cancel</button>
      </Modal>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>
          {page}/ {totalPages}
        </span>
        <button>Next</button>
      </div>
    </div>
  );
}

export default ReservationsPage;
