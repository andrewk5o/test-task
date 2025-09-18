# Test Task - User Management System

A full-stack application for managing users and their roles, built with React (Vite) frontend and NestJS backend.

<img width="2178" height="1020" alt="image" src="https://github.com/user-attachments/assets/e5e0a833-58b3-49e0-8b5a-7351841f9be3" />

## Tech Stack

### Frontend (Client)
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Radix UI** components (via shadcn/ui)
- **TanStack Query** for data fetching
- **Lucide React** for icons

### Backend (Server)
- **NestJS** framework
- **TypeORM** for database ORM
- **PostgreSQL** database
- **Docker** for containerization

## Project Structure

```
test-task/
├── apps/
│   ├── client/          # React frontend application
│   └── server/          # NestJS backend application
├── docker-compose.yml   # Docker configuration
└── package.json         # Root package with workspace scripts
```

## UI Components

The components in `apps/client/src/components/ui/` were generated using the [shadcn/ui](https://ui.shadcn.com/) library. These include:

- Button component
- Popover component  
- Select component
- Table component

These components provide a consistent design system and are built on top of Radix UI primitives with Tailwind CSS styling.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Docker (for database)

### Installation

1. **Install all dependencies** (root, client, and server):
   ```bash
   npm run install:all
   ```

2. **Start the development environment**:
   ```bash
   npm run dev:all
   ```

### Available Scripts

- `npm run install:all` - Install dependencies for all workspaces
- `npm run dev:all` - Start full development stack
- `npm run db:up` - Start only the database
- `npm run db:down` - Stop the database
- `npm run stack:up` - Start with Docker (production-like)
- `npm run stack:down` - Stop all Docker services

## API Endpoints

- `GET /users` - Get all users
- `GET /roles` - Get all roles
- `PATCH /users/:id/roles` - Update user roles

## Database

The application uses PostgreSQL with the following entities:
- **Users**: id, name, email, roleIds
- **Roles**: id, name

