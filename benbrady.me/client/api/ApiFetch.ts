function API_URL() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return "/api"
    case 'development':
      return "https://localhost:5001/api"

  }
}

const fetchHeaders = new Headers({
  'Access-Control-Allow-Origin': '*'
});


export function fetchFromApi(endpoint: string): Promise<Response> {
  const url = `${API_URL()}${endpoint}`;
  return fetch(url, { headers: fetchHeaders });
}

export function postToApi(endpoint: string, jsonBody: string, token?: string): Promise<Response> {
  const url = `${API_URL()}${endpoint}`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: jsonBody
  })
}

export function deleteToApi(endpoint: string, params: URLSearchParams, token?: string): Promise<Response> {
  const url = `${API_URL()}${endpoint}?${params}`;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
}