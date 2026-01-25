# Task Manager Backend

A robust, scalable RESTful API backend for a task and project management application built with NestJS, TypeScript, and PostgreSQL. This backend provides secure authentication, role-based access control, and comprehensive APIs for managing users, projects, tasks, and project memberships.

## 🚀 Features

### Authentication & Security
- **JWT Authentication**: Secure token-based authentication with access and refresh tokens
- **HTTP-Only Cookies**: Refresh tokens stored in secure HTTP-only cookies
- **Password Hashing**: Bcrypt password hashing for secure credential storage
- **Token Refresh**: Automatic token refresh mechanism
- **Role-Based Access Control**: System-level roles (Admin, User) and project-level roles (Admin, Manager, Member)
- **Guards & Interceptors**: Comprehensive authentication and authorization guards

### User Management
- **User Registration**: Secure user signup with validation
- **User Profiles**: Complete user profile management
- **User Listing**: Paginated user listing with filtering
- **Role Management**: Support for Admin and User roles

### Project Management
- **Project CRUD**: Create, read, update projects
- **Project Membership**: Add, remove, and manage project members
- **Project Roles**: Assign roles (Admin, Manager, Member) to project members
- **User Projects**: Get all projects for a specific user
- **Project Ownership**: Automatic project creator assignment as Admin

### Task Management
- **Task Types**: Support for Personal and Project tasks
- **Task Status**: Task status tracking (Todo, InProgress, Done)
- **Task Assignment**: Assign tasks to users
- **Project Association**: Link tasks to projects

### Database & ORM
- **Prisma ORM**: Type-safe database access with Prisma
- **PostgreSQL**: Robust relational database
- **Migrations**: Database schema versioning and migrations
- **Transaction Support**: ACID-compliant database transactions

### API Features
- **RESTful API**: Clean REST API design
- **Swagger Documentation**: Interactive API documentation at `/api/docs`
- **Request Validation**: DTO-based validation with class-validator
- **Error Handling**: Comprehensive error handling with custom filters
- **Pagination**: Built-in pagination support
- **Logging**: Structured logging with Pino

## 🛠️ Tech Stack

### Core Framework
- **NestJS 11.0.1**: Progressive Node.js framework
- **TypeScript 5.7.3**: Type-safe development
- **Node.js**: Runtime environment

### Database
- **PostgreSQL**: Relational database
- **Prisma 6.18.0**: Next-generation ORM
- **@prisma/client 6.18.0**: Prisma client library

### Authentication & Security
- **@nestjs/jwt 11.0.1**: JWT token handling
- **bcrypt 6.0.0**: Password hashing
- **cookie-parser 1.4.7**: Cookie parsing middleware

### Validation & Transformation
- **class-validator 0.14.2**: DTO validation
- **class-transformer 0.5.1**: Object transformation
- **@nestjs/mapped-types**: DTO mapping utilities

### Documentation
- **@nestjs/swagger 11.2.3**: OpenAPI/Swagger integration
- **swagger-ui-express 5.0.1**: Swagger UI

### Logging
- **nestjs-pino 4.4.1**: Pino logger integration
- **pino 10.1.0**: Fast JSON logger
- **pino-pretty 13.1.2**: Pretty log formatting

### Configuration
- **@nestjs/config 4.0.2**: Configuration management

### Development Tools
- **ESLint 9.18.0**: Code linting
- **Prettier 3.4.2**: Code formatting
- **Jest 30.0.0**: Testing framework
- **TypeScript ESLint 8.20.0**: TypeScript linting

## 📁 Project Structure

```
backend/
├── prisma/                    # Prisma schema and migrations
│   ├── migrations/           # Database migrations
│   └── schema.prisma         # Prisma schema definition
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── dto/              # Auth DTOs (login, signup)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── user/                 # User management module
│   │   ├── dto/              # User DTOs
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   ├── project/              # Project management module
│   │   ├── dto/              # Project DTOs
│   │   ├── project.controller.ts
│   │   ├── project.service.ts
│   │   └── project.module.ts
│   ├── project-member/       # Project membership module
│   │   ├── dto/              # Project member DTOs
│   │   ├── project-member.controller.ts
│   │   ├── project-member.service.ts
│   │   └── project-member.module.ts
│   ├── task/                 # Task management module
│   │   ├── dto/              # Task DTOs
│   │   ├── task.controller.ts
│   │   ├── task.service.ts
│   │   └── task.module.ts
│   ├── common/               # Shared utilities and modules
│   │   ├── decorators/       # Custom decorators
│   │   │   ├── cookies.decorator.ts
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── project.role.decorator.ts
│   │   │   ├── public.decorator.ts
│   │   │   └── role.decorator.ts
│   │   ├── filters/          # Exception filters
│   │   │   └── prisma-exception.filter.ts
│   │   ├── guards/           # Authentication/Authorization guards
│   │   │   ├── auth.guard.ts
│   │   │   ├── role.guard.ts
│   │   │   └── project.role.guard.ts
│   │   ├── interceptors/     # Request/Response interceptors
│   │   │   ├── clear-auth-cookie.interceptor.ts
│   │   │   └── set-auth-cookie.interceptor.ts
│   │   ├── prisma/           # Prisma service
│   │   │   └── prisma.service.ts
│   │   ├── types/            # TypeScript types
│   │   │   └── types.ts
│   │   └── utils/            # Utility functions
│   │       └── paginate.ts
│   ├── app.controller.ts     # Root controller
│   ├── app.module.ts         # Root module
│   └── main.ts               # Application entry point
├── test/                     # E2E tests
│   ├── mocks/               # Test mocks
│   └── app.e2e-spec.ts
├── .env.example              # Environment variables template
├── .gitignore
├── .prettierrc              # Prettier configuration
├── eslint.config.mjs        # ESLint configuration
├── nest-cli.json            # NestJS CLI configuration
├── package.json
├── tsconfig.json            # TypeScript configuration
└── tsconfig.build.json      # TypeScript build configuration
```

## 🚦 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **PostgreSQL**: v12 or higher
- **pnpm**: Package manager (or npm/yarn)

### Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager?schema=public"
PORT=5000
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=600s
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Database Setup

1. Run Prisma migrations:
```bash
npx prisma migrate dev
```

2. Generate Prisma Client:
```bash
npx prisma generate
```

3. (Optional) Seed the database:
```bash
npx prisma db seed
```

### Development

Start the development server with hot-reload:

```bash
pnpm run start:dev
```

The API will be available at `http://localhost:5000` (or the port specified in `PORT`).

### Production Build

Build for production:

```bash
pnpm run build
```

Start production server:

```bash
pnpm run start:prod
```

### Database Management

View database in Prisma Studio:

```bash
npx prisma studio
```

Create a new migration:

```bash
npx prisma migrate dev --name migration_name
```

## 🔐 Authentication Flow

### Registration
1. User submits signup data (email, password, firstName, lastName)
2. Password is hashed with bcrypt
3. User is created with default role "User"
4. Returns success response

### Login
1. User submits credentials
2. Credentials are validated
3. Access token (short-lived) and refresh token (7 days) are generated
4. Refresh token is stored in HTTP-only cookie
5. Access token is returned in response

### Token Refresh
1. Client sends refresh token from cookie
2. Refresh token is validated
3. New access and refresh tokens are generated
4. New refresh token is stored in HTTP-only cookie
5. New access token is returned

### Protected Routes
1. Client sends access token in Authorization header
2. `AuthGuard` validates token and extracts user
3. `RoleGuard` checks user role permissions
4. Request proceeds if authorized

## 🗄️ Database Schema

### Models

**User**
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `firstName`: String
- `lastName`: String
- `password`: String (Hashed)
- `role`: UserRole (Admin | User)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Project**
- `id`: UUID (Primary Key)
- `name`: String
- `description`: String (Optional)
- `createdBy`: UUID (Foreign Key)
- `updatedBy`: UUID (Foreign Key)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**ProjectMember**
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key)
- `projectId`: UUID (Foreign Key)
- `role`: ProjectRole (Admin | Manager | Member)
- `status`: MemberStatus (Active | Removed)
- `createdBy`: UUID (Foreign Key)
- `updatedBy`: UUID (Foreign Key)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Task**
- `id`: UUID (Primary Key)
- `type`: TaskType (Personal | Project)
- `projectId`: UUID (Foreign Key, Optional)
- `assignedTo`: UUID (Foreign Key)
- `title`: String
- `description`: String
- `dueDate`: DateTime
- `status`: TaskStatus (Todo | InProgress | Done)
- `createdBy`: UUID (Foreign Key)
- `updatedBy`: UUID (Foreign Key)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## 🛣️ API Endpoints

### Authentication (`/auth`)
- `POST /auth/signup` - Register new user (Public)
- `POST /auth/login` - Login user (Public)
- `GET /auth/refresh` - Refresh access token (Public)
- `GET /auth/loggedUser` - Get current user (Protected)
- `POST /auth/logout` - Logout user (Protected)

### Users (`/user`)
- `GET /user` - Get all users (Paginated, Protected)
- `GET /user/:id` - Get user by ID (Protected)
- `PATCH /user/:id` - Update user (Protected)
- `DELETE /user/:id` - Delete user (Protected)

### Projects (`/project`)
- `POST /project` - Create project (Protected, User role)
- `GET /project` - Get all projects (Paginated, Protected)
- `GET /project/my-projects` - Get user's projects (Protected)
- `PATCH /project/:projectId` - Update project (Protected, Project Admin role)

### Project Members (`/project-member`)
- `POST /project-member/:projectId` - Add member to project (Protected)
- `PATCH /project-member/:projectId/role` - Assign role to member (Protected)
- `DELETE /project-member/:projectId` - Remove member from project (Protected)

### Tasks (`/task`)
- `POST /task` - Create task (Protected, User role)
- `GET /task` - Get all tasks (Protected, User role)
- `GET /task/:id` - Get task by ID (Protected, User role)
- `PATCH /task/:id` - Update task (Protected, User role)
- `DELETE /task/:id` - Delete task (Protected, User role)

### API Documentation
- `GET /api/docs` - Swagger API documentation

## 🔒 Security Features

### Authentication Guards
- **AuthGuard**: Validates JWT tokens and extracts user information
- **RoleGuard**: Enforces system-level role-based access control
- **ProjectRoleGuard**: Enforces project-level role-based access control

### Decorators
- `@Public()`: Marks routes as publicly accessible
- `@Roles(...)`: Specifies allowed system roles
- `@ProjectRoles(...)`: Specifies allowed project roles
- `@CurrentUser()`: Injects current authenticated user

### Interceptors
- **SetAuthCookie**: Sets refresh token in HTTP-only cookie
- **ClearAuthCookie**: Clears refresh token cookie on logout

### Validation
- All DTOs are validated using `class-validator`
- Global validation pipe with whitelist and transform options
- Custom Prisma exception filter for database errors

## 📝 Key Features Implementation

### Pagination
Built-in pagination utility supports:
- Page number and page size
- "All" option to fetch all records
- Default page size: 20
- Maximum page size: 100

### Error Handling
- **PrismaExceptionFilter**: Handles Prisma-specific errors
  - `P2025`: Record Not Found (404)
  - `P2002`: Duplicate Record (409)
- Structured error responses with status codes
- Comprehensive logging with Pino

### Logging
- Structured JSON logging with Pino
- Request/response logging
- Error logging with context
- Pretty formatting in development

### CORS
- Configurable CORS origin via `CLIENT_URL`
- Credentials enabled for cookie support

## 🧪 Testing

### Unit Tests
```bash
pnpm run test
```

### Watch Mode
```bash
pnpm run test:watch
```

### Coverage
```bash
pnpm run test:cov
```

### E2E Tests
```bash
pnpm run test:e2e
```

### Debug Tests
```bash
pnpm run test:debug
```

## 📝 Scripts

- `pnpm run build` - Build the application
- `pnpm run format` - Format code with Prettier
- `pnpm run start` - Start the application
- `pnpm run start:dev` - Start in development mode with watch
- `pnpm run start:debug` - Start in debug mode
- `pnpm run start:prod` - Start in production mode
- `pnpm run lint` - Run ESLint
- `pnpm run test` - Run unit tests
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:cov` - Run tests with coverage
- `pnpm run test:e2e` - Run E2E tests

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | 5000 |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `JWT_EXPIRES_IN` | Access token expiration time | 600s |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 |
| `NODE_ENV` | Environment (development/production) | development |

### Validation Pipe Configuration
- **whitelist**: Strips non-whitelisted properties
- **forbidNonWhitelisted**: Throws error for non-whitelisted properties
- **transform**: Automatically transforms payloads to DTO instances

## 🎯 Development Guidelines

### Code Style
- Follow NestJS best practices and conventions
- Use TypeScript strict mode
- Follow the existing module structure
- Use DTOs for all request/response data

### Module Structure
- Each feature should have its own module
- Services contain business logic
- Controllers handle HTTP requests
- DTOs define data structures

### Database
- Use Prisma for all database operations
- Create migrations for schema changes
- Use transactions for multi-step operations
- Always validate foreign key relationships

### Security
- Never expose sensitive data in responses
- Always hash passwords
- Validate all user inputs
- Use guards for route protection
- Store refresh tokens in HTTP-only cookies

## 📚 API Documentation

The API documentation is available via Swagger UI at:
```
http://localhost:5000/api/docs
```

The Swagger documentation includes:
- All available endpoints
- Request/response schemas
- Authentication requirements
- Example requests and responses

## 🤝 Contributing

1. Follow the existing code style and structure
2. Ensure all tests pass
3. Update Swagger documentation for new endpoints
4. Add appropriate guards and validation
5. Update this README for significant changes

## 📄 License

This project is part of the Task Manager application suite.

---

Built with ❤️ using NestJS, TypeScript, and PostgreSQL
