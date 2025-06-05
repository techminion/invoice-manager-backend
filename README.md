# Invoice Manager Backend

A Node.js backend service for managing invoices, built with Express and TypeScript.

## Features

- Invoice management and processing
- File upload handling
- RESTful API endpoints
- TypeScript for type safety
- Express.js framework

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd invoice-manager-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your environment variables:

```env
PORT=3000
# Add other environment variables as needed
```

## Development

To start the development server:

```bash
npm run dev
```

## Building

To build the project:

```bash
npm run build
```

## Running in Production

To start the production server:

```bash
npm start
```

## Project Structure

```
src/
├── config/         # Configuration files
├── middleware/     # Express middleware
├── models/         # Data models
├── routes/         # API routes
├── utils/          # Utility functions
└── server.ts       # Main application file
```

## API Documentation

API documentation will be added as endpoints are implemented.

## License

MIT
