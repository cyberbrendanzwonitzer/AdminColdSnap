require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const config = require("./config");

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Proxy admin APIs to main server
const createProxyRoute = (name, path) => {
  app.get(path, async (_req, res) => {
    try {
      const url = `${config.mainApiBase}${path}`;
      console.log(`Proxying ${name} from ${url}`);
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
      
      res.json(data);
    } catch (error) {
      console.error(`Error proxying ${name}:`, error.message);
      
      if (config.enableMockData) {
        // Serve mock data for development/testing
        const mockSnapshots = {
          "/api/admin/snapshot": {
            ok: true,
            snapshot: {
              leadCount: 12,
              bookingCount: 8,
              bookingsConfirmed: 5,
              bookingsPendingWaiver: 3,
              recentEvents: [],
              recentBookings: []
            }
          },
          "/api/admin/bookings": {
            ok: true,
            bookings: [
              {
                id: "mock-1",
                customerName: "John Doe",
                customerEmail: "john@example.com",
                customerPhone: "(555) 123-4567",
                serviceCode: "cryo-full-body",
                status: "confirmed",
                provider: "mock",
                providerReference: "REF-001",
                preferredDateTime: new Date().toISOString(),
                createdAt: new Date().toISOString()
              },
              {
                id: "mock-2",
                customerName: "Jane Smith",
                customerEmail: "jane@example.com",
                customerPhone: "(555) 987-6543",
                serviceCode: "cryo-spot",
                status: "pending_waiver",
                provider: "mock",
                providerReference: "REF-002",
                preferredDateTime: new Date(Date.now() + 86400000).toISOString(),
                createdAt: new Date().toISOString()
              }
            ]
          }
        };
        
        return res.json(mockSnapshots[path] || { ok: false, error: "Not found" });
      }
      
      res.status(503).json({
        ok: false,
        error: `Cannot reach main API at ${config.mainApiBase}. Make sure the server is running, or enable ENABLE_MOCK_DATA=true for mock data.`
      });
    }
  });
};

createProxyRoute("snapshot", "/api/admin/snapshot");
createProxyRoute("bookings", "/api/admin/bookings");

// Serve static files (admin dashboard)
const webRoot = path.resolve(__dirname, "..", "web");
app.use(express.static(webRoot));

app.get("/", (_req, res) => {
  res.sendFile(path.join(webRoot, "admin.html"));
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ ok: false, error: "Internal server error" });
});

app.listen(config.port, () => {
  const mode = config.enableMockData ? "MOCK DATA" : `connected to ${config.mainApiBase}`;
  console.log(`CryoChamber Admin Dashboard running on http://localhost:${config.port}`);
  console.log(`Mode: ${mode}`);
});
