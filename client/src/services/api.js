const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";


export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
}

export async function getEvents() {
  const response = await fetch(`${API_URL}/events`);
  return response.json();
}

export async function getWorkshops() {
  const response = await fetch(`${API_URL}/workshops`);
  return response.json();
}

export async function getItemByType(type, id) {
  const endpointMap = {
    product: "products",
    event: "events",
    workshop: "workshops",
  };

  const endpoint = endpointMap[type];

  const response = await fetch(`${API_URL}/${endpoint}/${id}`);
  return response.json();
}

export async function createProduct(product) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function createEvent(event) {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  return response.json();
}

export async function createWorkshop(workshop) {
  const response = await fetch(`${API_URL}/workshops`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workshop),
  });

  return response.json();
}