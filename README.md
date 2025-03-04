# Ground Station UI

A React-based dashboard for monitoring and controlling rocket telemetry data.

## Features

- Real-time telemetry visualization
- Command interface for rocket control
- Interactive charts and gauges
- Websocket communication

## Prerequisites

- Node.js (v18+)
- npm or bun

## Getting Started

1. Clone the repository
   ```
   git clone <repository-url>
   cd ground-station-ui
   ```

2. Install dependencies
   ```
   npm install
   # or
   bun install
   ```

3. Start the development server
   ```
   npm run dev
   # or
   bun run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view the UI

## Development Commands

```
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Visx (data visualization)
- WebSockets

## Directory Structure

- `/src` - Source code
  - `/components` - React components
  - `/contexts` - React contexts
  - `/hooks` - Custom hooks
  - `/constants` - Configuration constants
