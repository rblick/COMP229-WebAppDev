import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { list } from "../api/api-portfolio";

export default function ManageServices() {
  const [services, setServices] = useState(null);
  const [error, setError] = useState("");

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

  return (
    <main>
      <Link to="/admin">Back to Admin Dashboard</Link>
      <h1>Manage Services</h1>

      {error && <p role="alert">{error}</p>}
      {!error && services === null && <p>Loading services…</p>}
      {services?.length === 0 && <p>No services yet.</p>}

      {services?.map((service) => (
        <section key={service.id}>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </section>
      ))}
    </main>
  );
}