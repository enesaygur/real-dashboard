import { useState } from "react";
import type { User } from "../../types/user";
import UserTable from "../../components/users/UserTable";
import Modal from "./../../components/common/Modal/Modal";
import UserForm from "../../components/users/UserForm/UserForm";
import { useUsers } from "../../hooks/useUsers";
import { toast } from "react-toastify";

function UsersPage() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<"name" | "email">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const limit = 3;
  const {
    users,
    loading,
    error,
    isError,
    isFetching,
    total,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers(page, limit);

  const totalPages = Math.ceil(total / limit);
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valueA = a[sortField].toLocaleLowerCase();
    const valueB = b[sortField].toLocaleLowerCase();
    if (sortDirection === "asc") {
      return valueA.localeCompare(valueB);
    }
    return valueB.localeCompare(valueA);
  });
  if (loading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return (
      <div>
        <h2>Something went wrong.</h2>
        <p>{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Users</h1>
      {isFetching && <p>Refreshing data...</p>}
      <button onClick={() => setIsCreateModalOpen(true)}>Create User</button>
      <input
        type="text"
        placeholder="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <UserTable
        users={sortedUsers}
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
        onView={(user) => {
          setSelectedUser(user);
          setIsModalOpen(true);
        }}
        onEdit={(user) => setEditingUser(user)}
        onDelete={(user) => setUserToDelete(user)}
      />
      <Modal
        title="User Details"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
      >
        {selectedUser && (
          <>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>

            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>

            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
          </>
        )}
      </Modal>
      <Modal
        title="Delete User"
        isOpen={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
      >
        <p>
          Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
        </p>
        <button
          onClick={async () => {
            if (!userToDelete) return;
            try {
              await deleteUser(userToDelete.id);
              toast.success("User deleted successfully");
              const newTotalPages = Math.ceil((total - 1) / limit);
              if (page > newTotalPages) {
                setPage(newTotalPages);
              }
              setUserToDelete(null);
            } catch {
              toast.error("Failed to delete user");
            }
          }}
        >
          Delete
        </button>
        <button onClick={() => setUserToDelete(null)}>Cancel</button>
      </Modal>
      <Modal
        title="Create User"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <UserForm
          onSubmit={async (user) => {
            try {
              await createUser(user);
              toast.success("User created successfully");
              setIsCreateModalOpen(false);
            } catch {
              toast.error("Failed to create user");
            }
          }}
        />
      </Modal>
      <Modal
        isOpen={editingUser !== null}
        title="Edit User"
        onClose={() => setEditingUser(null)}
      >
        {editingUser && (
          <UserForm
            initialValues={editingUser}
            onSubmit={async (updatedUser) => {
              try {
                await updateUser({ id: editingUser.id, user: updatedUser });
                toast.success("User updated successfully");
                setEditingUser(null);
              } catch {
                toast.error("Failed to update user");
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
          Page {page} / {totalPages}
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

export default UsersPage;
