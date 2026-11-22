import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { create, list, update, remove } from "../api/api-portfolio";

export default function ManageUsers() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    list("users", controller.signal)
      .then((records) => setUsers(records))
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      });

    return () => controller.abort();
  }, []);

  function startEditing(user) {
    setEditingId(user.id);
    setFirstname(user.firstname ?? "");
    setLastname(user.lastname ?? "");
    setEmail(user.email ?? "");
    setPassword("");
    setError("");
  }

  function resetForm() {
    setEditingId(null);
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const record = {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
    };

    if (!record.firstname || !record.lastname || !record.email) {
      setError("Enter a first name, last name, and email.");
      return;
    }

    if (editingId === null && !password.trim()) {
      setError("Enter a password for the new user.");
      return;
    }

    if (password.trim()) {
      record.password = password;
    }

    setSaving(true);

    try {
      if (editingId === null) {
        const savedUser = await create("users", record);
        setUsers((previous) => [...previous, savedUser]);
      } else {
        await update("users", editingId, record);

        setUsers((previous) =>
          previous.map((user) =>
            user.id === editingId ? { ...user, ...record } : user
          )
        );
      }

      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    setError("");
    setSaving(true);

    try {
      await remove("users", id);
      setUsers((previous) =>
        previous.filter((user) => user.id !== id)
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main>
      <Link to="/admin">Back to Admin Dashboard</Link>
      <h1>Manage Users</h1>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="user-firstname">First Name</label>
        <input
          id="user-firstname"
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
          required
        />

        <label htmlFor="user-lastname">Last Name</label>
        <input
          id="user-lastname"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          required
        />

        <label htmlFor="user-email">Email</label>
        <input
          id="user-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="user-password">
          {editingId === null ? "Password" : "New password (leave blank to keep current)"}
        </label>
        <input
          id="user-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required={editingId === null}
        />

        <button type="submit" disabled={saving || users === null}>
          {editingId === null ? "Add User" : "Save Changes"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={resetForm} disabled={saving}>
            Cancel
          </button>
        )}
      </form>

      {!error && users === null && <p>Loading users…</p>}
      {users?.length === 0 && <p>No users yet.</p>}

      {users?.map((user) => (
        <section key={user.id}>
          <h2>{user.firstname} {user.lastname}</h2>
          <p>{user.email}</p>
          <button
            type="button"
            onClick={() => startEditing(user)}
            disabled={saving}>
            Edit
          </button>
          <button 
            type="button"
            onClick={() => handleDelete(user.id)}
            disabled={saving}>
            Delete
          </button>
        </section>
      ))}
    </main>
  );
}