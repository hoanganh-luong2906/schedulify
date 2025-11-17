# Schedulify

Monorepo for the Schedulify system.

| Path | Description | Stack |
|------|-------------|-------|
| `frontend/` | Web client | Next.js 14, pnpm |
| `backend/`  | API server | .NET 8, PostgreSQL, Docker |

## Run everything with Docker

```bash
cp .env.example .env                 # fill in POSTGRES_PASSWORD, JWT_SECRET_KEY, etc.
docker compose up --build -d         # db :5432, backend :8080, frontend :3000
docker compose run --rm migrate      # first run / after new migrations: apply EF Core migrations
```

Swagger: http://localhost:8080/swagger. `NEXT_PUBLIC_*` values are baked in at build time, so re-run `docker compose build frontend` after changing them.

## Frontend only (hot reload)

```bash
cd frontend
cp .env.example .env.local
pnpm install
pnpm dev
```

Point `NEXT_PUBLIC_API_URL` at the backend (`http://localhost:8080` when running via compose).

## Backend only

Needs the .NET 8 SDK, or use the compose `backend` + `db` services above.

## CI/CD

Workflows in `.github/workflows/` are path-filtered: changes under `frontend/` trigger frontend deploys, changes under `backend/` trigger backend build/deploy.
