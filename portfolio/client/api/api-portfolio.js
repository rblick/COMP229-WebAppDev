export async function list(resource, signal) {
  const response = await fetch(`/api/${resource}`, { signal });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Could not load records.");
  }

  return result.data;
}