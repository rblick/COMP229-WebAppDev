import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { create, list, update, remove } from "../api/api-portfolio";

export default function ManageReferences() {
  const [references, setReferences] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    list("references", controller.signal)
      .then((records) => setReferences(records))
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      });

    return () => controller.abort();
  }, []);

  function startEditing(reference) {
    setEditingId(reference.id);
    setName(reference.name ?? "");
    setCompany(reference.company ?? "");
    setPosition(reference.position ?? "");
    setTestimonial(reference.testimonial ?? "");
    setError("");
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setCompany("");
    setPosition("");
    setTestimonial("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const record = {
      name: name.trim(),
      company: company.trim(),
      position: position.trim(),
      testimonial: testimonial.trim(),
    };

    if (!record.name || !record.testimonial) {
      setError("Enter a name and testimonial.");
      return;
    }

    setSaving(true);

    try {
      if (editingId === null) {
        const savedReference = await create("references", record);
        setReferences((previous) => [...previous, savedReference]);
      } else {
        await update("references", editingId, record);

        setReferences((previous) =>
          previous.map((reference) =>
            reference.id === editingId ? { ...reference, ...record } : reference
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
    if (!window.confirm("Delete this reference?")) {
      return;
    }

    setError("");
    setSaving(true);

    try {
      await remove("references", id);
      setReferences((previous) =>
        previous.filter((reference) => reference.id !== id)
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
      <h1>Manage References</h1>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="reference-name">Name</label>
        <input
          id="reference-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="reference-company">Company</label>
        <input
          id="reference-company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />

        <label htmlFor="reference-position">Position</label>
        <input
          id="reference-position"
          value={position}
          onChange={(event) => setPosition(event.target.value)}
        />

        <label htmlFor="reference-testimonial">Testimonial</label>
        <textarea
          id="reference-testimonial"
          value={testimonial}
          onChange={(event) => setTestimonial(event.target.value)}
          required
        />

        <button type="submit" disabled={saving || references === null}>
          {editingId === null ? "Add Reference" : "Save Changes"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={resetForm} disabled={saving}>
            Cancel
          </button>
        )}
      </form>

      {!error && references === null && <p>Loading references…</p>}
      {references?.length === 0 && <p>No references yet.</p>}

      {references?.map((reference) => (
        <section key={reference.id}>
          <h2>{reference.name}</h2>
          {reference.company && <p>Company: {reference.company}</p>}
          {reference.position && <p>Position: {reference.position}</p>}
          <p>{reference.testimonial}</p>
          <button
            type="button"
            onClick={() => startEditing(reference)}
            disabled={saving}>
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(reference.id)}
            disabled={saving}>
            Delete
          </button>
        </section>
      ))}
    </main>
  );
}
