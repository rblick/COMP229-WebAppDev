import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { create, list, update, remove } from "../api/api-portfolio";

export default function ManageServices() {
  const [services, setServices] = useState(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    list("services", controller.signal)
      .then((records) => setServices(records))
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      });

    return () => controller.abort();
  }, []);

  function startEditing(service) {
    setEditingId(service.id);
    setTitle(service.title);
    setDescription(service.description);
    setError("");
  }

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const record = {
      title: title.trim(),
      description: description.trim(),
    };

    if (!record.title || !record.description) {
      setError("Enter a title and description.");
      return;
    }

    setSaving(true);

    try {
      if (editingId === null) {
        const savedService = await create("services", record);
        setServices((previous) => [...previous, savedService]);
      } else {
        await update("services", editingId, record);

        setServices((previous) =>
          previous.map((service) =>
            service.id === editingId ? { ...service, ...record } : service
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
    if (!window.confirm("Delete this service?")) {
      return;
    }

    setError("");
    setSaving(true);

    try {
      await remove("services", id);
      setServices((previous) =>
        previous.filter((service) => service.id !== id)
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
      <h1>Manage Services</h1>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="service-title">Title</label>
        <input
          id="service-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label htmlFor="service-description">Description</label>
        <textarea
          id="service-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <button type="submit" disabled={saving || services === null}>
          {editingId === null ? "Add Service" : "Save Changes"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={resetForm} disabled={saving}>
            Cancel
          </button>
        )}
      </form>

      {!error && services === null && <p>Loading services…</p>}
      {services?.length === 0 && <p>No services yet.</p>}

      {services?.map((service) => (
        <section key={service.id}>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <button
            type="button"
            onClick={() => startEditing(service)}
            disabled={saving}>
            Edit
          </button>
          <button 
            type="button"
            onClick={() => handleDelete(service.id)}
            disabled={saving}>
            Delete
          </button>
        </section>
      ))}
    </main>
  );
}