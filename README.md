# CryoChamber Admin Dashboard

A standalone admin dashboard for viewing and managing CryoChamber bookings and appointments.

## Quick Start

### Option 1: Connect to Main API (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` from `.env.example`:**
   ```bash
   cp .env.example .env
   ```

3. **Start the main CryoChamber API** (if running locally):
   ```bash
   # In the main CryoChamber directory
   npm run dev
   ```

4. **Start the admin dashboard:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3001
   ```

### Option 2: Standalone Mode with Mock Data

For testing without the main API:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set mock data mode in `.env`:**
   ```
   ENABLE_MOCK_DATA=true
   ```

3. **Start the dashboard:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3001
   ```

## Configuration

Edit `.env` to configure:

- `PORT` - Dashboard port (default: 3001)
- `CORS_ORIGIN` - Allowed CORS origin (default: *)
- `MAIN_API_BASE` - URL of the main CryoChamber API (default: http://localhost:3000)
- `ENABLE_MOCK_DATA` - Use mock data instead of connecting to main API (default: false)

## Features

- **Real-time appointments** - View all booked appointments with live updates
- **Filtering** - Filter by confirmation status (Confirmed, Pending Waiver)
- **Search** - Search appointments by customer name, email, or service code
- **Summary metrics** - See counts of total bookings, confirmed, pending, and leads
- **Auto-refresh** - Dashboard refreshes every 30 seconds automatically
- **Responsive design** - Works on desktop, tablet, and mobile

## Deployment

### To Deploy to Railway

1. Push this repository to GitHub
2. Create a new project on [railway.app](https://railway.app)
3. Select "Deploy from GitHub" and choose this repository
4. Set environment variables:
   - `MAIN_API_BASE` = URL of your deployed main CryoChamber API
   - Optional: `PORT` = 3000 (Railway will set this, but you can override)
5. Deploy

### To Deploy to Render, Fly.io, or Heroku

Similar process - connect your GitHub repo and set the `MAIN_API_BASE` environment variable pointing to your main API URL.

## API Requirements

The admin dashboard expects the main API to provide two endpoints:

- `GET /api/admin/snapshot` - Returns booking and lead counts
- `GET /api/admin/bookings` - Returns list of appointments with customer details

Both endpoints should return JSON responses with `ok: true` and the data payload.

## Development

### Watch mode (auto-reload on file changes):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

## Troubleshooting

**"Cannot reach main API"**
- Ensure the main CryoChamber API is running on the configured `MAIN_API_BASE` URL
- Check the URL in your `.env` file
- Or enable `ENABLE_MOCK_DATA=true` to use test data

**Logo not showing**
- Ensure `web/assets/coldsnap-logo.jpg` exists in the repository
- Check that the main API can serve static assets if using a remote main API

**CORS errors**
- Update `CORS_ORIGIN` in `.env` if accessing from a different domain
- Set to `*` to allow all origins (not recommended for production)

## License

Same as CryoChamber project license
