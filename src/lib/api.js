// API client for admin panel
const API_BASE = 'http://localhost:3001/api';

// Generic API functions
async function getData(endpoint) {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

async function updateData(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
    throw error;
  }
}

// Specific endpoints
export const api = {
  hero: {
    get: () => getData('hero'),
    update: (data) => updateData('hero', data)
  },

  projects: {
    get: () => getData('projects'),
    update: (data) => updateData('projects', data)
  },

  about: {
    get: () => getData('about'),
    update: (data) => updateData('about', data)
  },

  services: {
    get: () => getData('services'),
    update: (data) => updateData('services', data)
  },

  contact: {
    get: () => getData('contact'),
    update: (data) => updateData('contact', data)
  },

  health: () => getData('health')
};
