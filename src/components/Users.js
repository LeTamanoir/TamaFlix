import { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();

    setUsers(data.users);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure ?")) {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) fetchUsers();
    }
  };

  const addUser = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newUser }),
    });
    const data = await res.json();

    if (data.ok) {
      fetchUsers();
      setError("");
      setNewUser({ username: "", password: "" });
    } else setError(data.error);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white my-4 rounded-3 p-3 table-striped">
      <table className="table table-sm mb-4">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ username, role, id }, i) => (
            <tr key={i}>
              <th>{id}</th>
              <td>{username}</td>
              <td>{role}</td>
              <td className="text-center">
                <a
                  type="button"
                  className="link-danger"
                  style={{
                    visibility: role !== "admin" ? "visible" : "hidden",
                  }}
                  onClick={() => deleteUser(id)}
                >
                  delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        className="btn btn-sm btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addUser"
      >
        Add user
      </button>

      <div className="modal fade" id="addUser" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add user
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label htmlFor="username" className="col-form-label">
                  Username :
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  id="username"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="col-form-label">
                  Password:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  id="password"
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={addUser}
              >
                Add user
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
