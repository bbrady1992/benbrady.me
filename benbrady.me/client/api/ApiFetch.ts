function API_URL() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return "http://api:5000"
    case 'development':
      return "https://localhost:5001"

  }
}

const fetchHeaders = new Headers({
  'Access-Control-Allow-Origin': '*'
});


export function fetchFromApi(endpoint: string): Promise<Response> {
  const url = `${API_URL()}${endpoint}`;
  return fetch(url, { headers: fetchHeaders });
}