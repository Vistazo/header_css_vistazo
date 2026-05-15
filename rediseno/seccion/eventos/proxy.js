const http = require("http");

const AUTH_API_URL = "https://backoffice.bmcodigo.com/api/public/auth/token";
const EVENTS_API_URL = "https://backoffice.bmcodigo.com/api/events";

const AUTH_CREDENTIALS = {
  email: "eriveraec@gmail.com",
  password: "123456",
  name: "Mi Sitio Web",
};

const PORT = 3001;

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

async function getToken() {
  const response = await fetch(AUTH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(AUTH_CREDENTIALS),
  });

  if (!response.ok) {
    throw new Error(`Error obteniendo token: ${response.status}`);
  }

  const data = await response.json();
  const token = data?.token || data?.accessToken || data?.data?.token || null;

  if (!token) {
    throw new Error("No se encontró token en la respuesta de autenticación");
  }

  return token;
}

async function getEvents(token) {
  const response = await fetch(EVENTS_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error obteniendo eventos: ${response.status}`);
  }

  return response.json();
}

const server = http.createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/events" && req.method === "GET") {
    try {
      const token = await getToken();
      const data = await getEvents(token);
      const body = JSON.stringify(data);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(body);
    } catch (error) {
      const body = JSON.stringify({ error: error.message });
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(body);
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`Proxy escuchando en http://localhost:${PORT}`);
});
