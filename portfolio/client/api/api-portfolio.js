export async function list(resource, signal) {
  const response = await fetch(`/api/${resource}`, { signal });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Could not load records.");
  }

  return result.data;
}

export async function create(resource, record) {
  const response = await fetch(`/api/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Could not save the record.");
  }

  return result.data;
}