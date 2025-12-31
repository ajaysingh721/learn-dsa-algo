const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
}

export async function fetchCategoryBySlug(slug: string) {
  const response = await fetch(`${API_BASE_URL}/categories/slug/${slug}`);
  if (!response.ok) throw new Error("Failed to fetch category");
  return response.json();
}

export async function fetchExamples(categoryId?: number) {
  const url = categoryId
    ? `${API_BASE_URL}/examples?category_id=${categoryId}`
    : `${API_BASE_URL}/examples`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch examples");
  return response.json();
}

export async function fetchExampleBySlug(slug: string) {
  const response = await fetch(`${API_BASE_URL}/examples/slug/${slug}`);
  if (!response.ok) throw new Error("Failed to fetch example");
  return response.json();
}

export async function fetchAlgorithms(category?: string) {
  const url = category
    ? `${API_BASE_URL}/algorithms?category=${category}`
    : `${API_BASE_URL}/algorithms`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch algorithms");
  return response.json();
}

export async function fetchAlgorithmBySlug(slug: string) {
  const response = await fetch(`${API_BASE_URL}/algorithms/slug/${slug}`);
  if (!response.ok) throw new Error("Failed to fetch algorithm");
  return response.json();
}
