# Architecture

## Repository Structure

This project is organized as a Bun workspace monorepo.

### Applications

- `customer-web` — Customer-facing booking application.
- `provider-web` — Service provider management application.
- `api` — Backend REST API.

### Packages

- `shared` — Code shared between applications and/or backend when appropriate.
- `validation` — Shared Zod validation schemas.

## Architecture Principles

### Single Service Provider

The MVP supports one service provider.

The architecture should avoid introducing multi-provider abstractions until there is a real product requirement for them.

### Guest Customer Booking

Customers do not need an account to make an appointment.

The provider application requires authentication.

### Backend Owns Business Rules

Availability and appointment validation are enforced by the API.

The frontend may display available slots, but the backend is the source of truth.

### Shared Code

Shared packages should only contain code that genuinely needs to be shared.

We should avoid creating abstractions prematurely.