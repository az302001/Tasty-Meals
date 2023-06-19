import React, { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    fetch("/api/Roles") // Cambia la ruta a tu endpoint correspondiente
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSelectedUser(filteredUsers[0] || null);
  };

  const handleAssignRole = () => {
    if (selectedUser && selectedRole) {
      const updatedUser = {
        ...selectedUser,
        role: selectedRole
      };

      fetch("/api/Roles", {
        // Cambia la ruta a tu endpoint correspondiente
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUser.id, role: selectedRole }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          // Realiza las acciones necesarias después de asignar el rol de administrador
          // Puedes actualizar el estado o realizar otras operaciones
        })
        .catch((error) => console.log(error));

      setSelectedUser(updatedUser);
      setSearchQuery("");
      setSelectedRole("");
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} ({user.role})
          </li>
        ))}
      </ul>

      <h2>Buscar Usuario y Asignar Rol</h2>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {selectedUser && (
        <div>
          <h3>Usuario Seleccionado</h3>
          <p>
            {selectedUser.name} - {selectedUser.email} ({selectedUser.role})
          </p>
          <select
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value)}
          >
            <option value="">Seleccionar Rol</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
          <button type="button" onClick={handleAssignRole}>
            Asignar Rol
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
