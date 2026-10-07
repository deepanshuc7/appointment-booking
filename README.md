# Appointment Booking System

A production-style appointment booking system built as a full-stack learning and portfolio project.

The system is designed for a **single service provider** who can manage services, working hours, availability, and customer appointments. Customers can book appointments as guests without creating an account.

## Architecture

The project is organized as a Bun workspace monorepo with two separate frontends and one backend API:

```text
appointment-booking/
├── apps/
│   ├── customer-web/       # Customer booking application
│   ├── provider-web/       # Service provider management application
│   └── api/                # Backend REST API
│
├── packages/
│   ├── shared/             # Shared code when genuinely needed
│   └── validation/         # Shared validation schemas
│
├── docs/
│   └── adr/                # Architecture Decision Records
│
├── docker-compose.yml
├── package.json
└── README.md
```

### Main flows

**Customer**

```text
Browse services
      ↓
Select service
      ↓
Select date
      ↓
Select available time
      ↓
Enter contact information
      ↓
Review booking
      ↓
Confirm appointment
```

**Service provider**

```text
Login
  ↓
Dashboard
  ├── Calendar
  ├── Appointments
  ├── Services
  ├── Availability
  └── Settings
```

## Technology Stack

### Customer frontend

* React
* TypeScript
* Vite
* TanStack Router
* TanStack Query
* TanStack Form
* Zod
* Tailwind CSS

### Provider frontend

* React
* TypeScript
* Vite
* TanStack Router
* TanStack Query
* TanStack Form
* Zod
* Tailwind CSS

### Backend

* Bun
* Hono
* TypeScript
* REST API
* Zod

### Database

* PostgreSQL
* Drizzle ORM
* Drizzle Kit

### Testing & Infrastructure

* Vitest
* Docker
* Docker Compose
* GitHub Actions

## Database Setup

The API uses PostgreSQL with Drizzle ORM.

### Start PostgreSQL

Make sure Docker Desktop is running, then from the repository root:

```bash
docker compose up -d postgres
```

PostgreSQL runs inside Docker and is exposed on:

```text
localhost:5433
```

Port `5433` is used because port `5432` is occupied by a PostgreSQL installation on the development machine.

Inside the Docker container, PostgreSQL continues to run on its standard port `5432`.

### Configure the API

Create:

```text
apps/api/.env
```

using `apps/api/.env.example` as a reference:

```env
DATABASE_URL=postgres://appointment:appointment@localhost:5433/appointment_booking
```

The `.env` file is intentionally ignored by Git.

### Run migrations

From the API directory:

```bash
cd apps/api
```

Generate a migration after changing the Drizzle schema:

```bash
bun run db:generate
```

Apply pending migrations:

```bash
bun run db:migrate
```

Open Drizzle Studio:

```bash
bun run db:studio
```

### Stop PostgreSQL

From the repository root:

```bash
docker compose down
```

## Development

Install dependencies from the repository root:

```bash
bun install
```

Start the customer application:

```bash
bun run dev:customer
```

Start the provider application:

```bash
bun run dev:provider
```

Start the API:

```bash
bun run dev:api
```

Run formatting:

```bash
bun run format
```

Check formatting:

```bash
bun run format:check
```

Run tests:

```bash
bun run test
```

## Current Database Schema

The first database entity is the provider authentication user:

```text
users
├── id
├── email
├── password_hash
├── first_name
├── last_name
├── is_active
├── created_at
└── updated_at
```

The database schema will be expanded incrementally as the application's domain is implemented.

Planned core entities include:

* `users`
* `services`
* `working_hours`
* `availability_exceptions`
* `appointments`

## API

The backend exposes a REST API consumed by both frontend applications.

Planned API areas include:

```text
/api/auth
/api/services
/api/availability
/api/appointments
```

Business rules such as appointment availability and booking conflict detection are owned by the backend rather than implemented independently in each frontend.

## Architectural Principles

### Single provider

The MVP is designed for one service provider. It is not a marketplace and does not support multiple providers.

### Guest bookings

Customers do not need an account to make an appointment.

### Backend-owned business rules

The API is responsible for enforcing important business rules such as:

* service availability
* working hours
* availability exceptions
* appointment conflicts
* appointment status transitions

### Historical appointment snapshots

Appointments will store relevant booking-time information such as service price and duration-derived start/end times rather than relying entirely on the current service definition.

This ensures historical appointments remain accurate when a service is changed later.

### Avoid premature abstraction

Shared packages and abstractions are introduced only when there is a genuine need for shared behavior.

The project intentionally avoids unnecessary architectural complexity such as introducing Clean Architecture layers before the domain requires them.

## Project Status

The project is being developed incrementally.

### Completed

* [x] Monorepo foundation
* [x] Customer frontend foundation
* [x] Provider frontend foundation
* [x] Hono API foundation
* [x] API health endpoint
* [x] Prettier configuration
* [x] PostgreSQL Docker environment
* [x] Drizzle ORM configuration
* [x] Initial `users` schema
* [x] Database migrations

### Planned

* [ ] Authentication
* [ ] Service management
* [ ] Working hours management
* [ ] Availability exceptions
* [ ] Availability calculation engine
* [ ] Appointment booking
* [ ] Appointment management
* [ ] Provider dashboard
* [ ] Customer booking interface
* [ ] Automated tests
* [ ] CI/CD
* [ ] Production deployment

## License

This project is developed for educational and portfolio purposes.
