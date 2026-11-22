import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { create, list, update, remove } from "../api/api-portfolio";

export default function ManageProjects() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completion, setCompletion] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    list("projects", controller.signal)
      .then((records) => setProjects(records))
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      });

    return () => controller.abort();
  }, []);

  function startEditing(project) {
    setEditingId(project.id);
    setTitle(project.title ?? "");
    setDescription(project.description ?? "");
    setCompletion(project.completion?.slice(0, 10) ?? "");
    setImage(project.image ?? "");
    setError("");
  }

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setError("");
    setCompletion("");
    setImage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const record = {
      title: title.trim(),
      description: description.trim(),
      completion: completion || null,
      image: image.trim(),
    };

    if (!record.title || !record.description) {
      setError("Enter a title and description.");
      return;
    }

    setSaving(true);

    try {
      if (editingId === null) {
        const savedProject = await create("projects", record);
        setProjects((previous) => [...previous, savedProject]);
      } else {
        await update("projects", editingId, record);

        setProjects((previous) =>
          previous.map((project) =>
            project.id === editingId ? { ...project, ...record } : project
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
    if (!window.confirm("Delete this project?")) {
      return;
    }

    setError("");
    setSaving(true);

    try {
      await remove("projects", id);
      setProjects((previous) =>
        previous.filter((project) => project.id !== id)
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
      <h1>Manage Projects</h1>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="project-title">Title</label>
        <input
          id="project-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <label htmlFor="project-completion">Completion Date</label>
        <input
          id="project-completion"
          type="date"
          value={completion}
          onChange={(event) => setCompletion(event.target.value)}
        />

        <label htmlFor="project-image">Image URL or Path</label>
        <input
          id="project-image"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />

        <button type="submit" disabled={saving || projects === null}>
          {editingId === null ? "Add Project" : "Save Changes"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={resetForm} disabled={saving}>
            Cancel
          </button>
        )}
      </form>

      {!error && projects === null && <p>Loading projects…</p>}
      {projects?.length === 0 && <p>No projects yet.</p>}

      {projects?.map((project) => (
        <section key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Completion date: {project.completion?.slice(0, 10) || "In development"}</p>
          {project.image && <p>Image: {project.image}</p>}
          <button
            type="button"
            onClick={() => startEditing(project)}
            disabled={saving}>
            Edit
          </button>
          <button 
            type="button"
            onClick={() => handleDelete(project.id)}
            disabled={saving}>
            Delete
          </button>
        </section>
      ))}
    </main>
  );
}