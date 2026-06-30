# Taskium — Backend API

> **Work in progress** — This backend is under active development. Authentication, projects, and project membership are partially implemented. The task module has route scaffolding but **business logic is not yet connected to the database**.

REST API for **Taskium**, a personal and project-based task management platform. Users manage their own tasks, collaborate inside projects, and operate under system-level and project-level roles.

## Overview

Taskium supports two task scopes defined in the data model:

| Task type | Description |
|-----------|-------------|
| **Personal** | Tasks owned by a user with no project association (`projectId` is null). |
| **Project** | Tasks linked to a project, optionally assigned to a project member. |

Projects are collaborative workspaces. When a user creates a project, they are automatically added as a **Project Admin**. Members can be invited with roles that control what they can do inside that project.

## User levels & access control

### System roles (`UserRole`)

Applied across the entire application via JWT and `RoleGuard`.

| Role | Access |
|------|--------|
| **Admin** | Full user management (`GET/PATCH/DELETE /user`). Cannot access standard user project/task routes guarded by `@Roles('User')`. |
| **User** | Default role on signup. Can create and manage projects, project members, and tasks (when implemented). |

### Project roles (`ProjectRole`)

Applied per project via `ProjectRoleGuard`. A user must be an **Active** project member.

| Role | Typical permissions |
|------|---------------------|
| **Admin** | Update project details. Full project-level control. |
| **Manager** | Add members, assign roles, remove members (with Admin). |
| **Member** | Participate in the project; base membership role for new invites. |

### Member status (`MemberStatus`)

| Status | Meaning |
|--------|---------|
| **Active** | Member can access project-scoped resources. |
| **Removed** | Soft-removed from the project; access is denied. |

## Features

### Implemented

- **Authentication** — Signup, login, JWT access tokens, HTTP-only refresh cookie, token refresh, logout, current user profile
- **User management** — Paginated user listing, get/update/delete (Admin only)
- **Projects** — Create project (creator becomes Admin), list all projects, list current user's projects, update project (Project Admin)
- **Project members** — Add member, assign role, soft-remove member (Project Admin / Manager)
- **API docs** — Swagger UI at `/api/docs`
- **Database** — PostgreSQL with Prisma migrations and typed schema

### Planned / in progress

- **Task CRUD** — Endpoints exist but `TaskService` returns placeholders; DTOs are not fully defined
- **Task filtering** — Personal vs project task views, assignment workflows, status transitions
- **Pagination responses** — Some services do not yet return structured response bodies after mutations

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | NestJS 11, TypeScript 5.7 |
| Database | PostgreSQL, Prisma 6 |
| Auth | JWT (`@nestjs/jwt`), bcrypt |
| Validation | class-validator, class-transformer |
| Docs | Swagger / OpenAPI |
| Logging | Pino (`nestjs-pino`) |

## Data model

```
User ──┬── Task (assignedTo, personal or project tasks)
       └── ProjectMember ── Project ── Task
```

### Task lifecycle

| Field | Values |
|-------|--------|
| `type` | `Personal`, `Project` |
| `status` | `Todo` (default), `InProgress`, `Done` |
| `projectId` | Required for project tasks; null for personal tasks |
| `assignedTo` | Optional user assignment |
| `dueDate` | Optional |

## Run locally

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- pnpm (recommended)

### Setup

```bash
cd backend
pnpm install
cp .env.example .env
```

Configure `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskium?schema=public"
PORT=5000
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=600s
CLIENT_URL=http://localhost:3000
```

### Database

```bash
npx prisma migrate dev
npx prisma generate
```

### Development

```bash
pnpm run start:dev
```

API base URL: `http://localhost:5000`  
Swagger docs: `http://localhost:5000/api/docs`

### Production

```bash
pnpm run build
pnpm run start:prod
```

## API endpoints

### Auth (`/auth`)

| Method | Path | Access |
|--------|------|--------|
| POST | `/auth/signup` | Public |
| POST | `/auth/login` | Public |
| GET | `/auth/refresh` | Public |
| GET | `/auth/loggedUser` | Authenticated |
| POST | `/auth/logout` | Authenticated |

### Users (`/user`) — Admin only

| Method | Path | Description |
|--------|------|-------------|
| GET | `/user` | List users (paginated) |
| GET | `/user/:id` | Get user by ID |
| PATCH | `/user/:id` | Update user |
| DELETE | `/user/:id` | Delete user |

### Projects (`/project`) — User role

| Method | Path | Description |
|--------|------|-------------|
| POST | `/project` | Create project |
| GET | `/project` | List all projects (paginated) |
| GET | `/project/my-projects` | List current user's projects |
| PATCH | `/project/:projectId` | Update project (Project Admin) |

### Project members (`/project-member`) — User role + project role

| Method | Path | Project roles |
|--------|------|---------------|
| POST | `/project-member/:projectId` | Admin, Manager |
| PATCH | `/project-member/:projectId` | Admin, Manager (assign role) |
| PATCH | `/project-member/:projectId` | Admin, Manager (remove member) |

### Tasks (`/task`) — User role (stub)

| Method | Path | Status |
|--------|------|--------|
| POST | `/task` | Scaffold only |
| GET | `/task` | Scaffold only |
| GET | `/task/:id` | Scaffold only |
| PATCH | `/task/:id` | Scaffold only |
| DELETE | `/task/:id` | Scaffold only |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm run start:dev` | Dev server with hot reload |
| `pnpm run build` | Production build |
| `pnpm run start:prod` | Run production build |
| `pnpm run test` | Unit tests |
| `pnpm run test:e2e` | E2E tests |
| `pnpm run lint` | ESLint |

## Project structure

```
backend/
├── prisma/           # Schema and migrations
├── src/
│   ├── auth/         # Authentication
│   ├── user/         # User management
│   ├── project/      # Projects
│   ├── project-member/
│   ├── task/         # Tasks (in progress)
│   └── common/       # Guards, decorators, Prisma, utils
└── test/
```

## License

Private / unlicensed — part of the Taskium application suite.
