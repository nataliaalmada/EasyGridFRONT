// utils/api.js

// Mock API function to simulate data retrieval
const mockFetch = (url, options) => {
  console.log(`Mock fetching: ${url} with options:`, options);

  // Add mock responses for different API endpoints
  if (url.includes("/getall")) {
    return Promise.resolve({
      data: { pages: [{ name: "example-page", CategoriasPageInst: { slug: "example-slug", name: "Example Category" } }] },
    });
  }

  if (url.includes("/noticias")) {
    return Promise.resolve({
      data: { noticias: [{ id: 1, title: "Example News", content: "This is example news content" }] },
    });
  }

  // Default mock response
  return Promise.resolve({ data: {} });
};

const api = {
  get: (url) => mockFetch(url, { method: "GET" }),
  post: (url, data) => mockFetch(url, { method: "POST", body: data }),
  put: (url, data) => mockFetch(url, { method: "PUT", body: data }),
  delete: (url) => mockFetch(url, { method: "DELETE" }),
};

export default api;

