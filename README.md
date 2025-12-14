# Schedulify

Monorepo for the Schedulify system.

| Path | Description | Stack |
|------|-------------|-------|
| `frontend/` | Web client | Next.js 14, pnpm |
| `backend/`  | API server | .NET 8, PostgreSQL, Docker |

## Frontend

```bash
cd frontend
cp .env.example .env.local
pnpm install
pnpm dev
```

## Backend

```bash
cd backend
docker compose up --build -d   # needs POSTGRES_PASSWORD, MAIL_PASSWORD, SECRET_KEY in env
```

## CI/CD

Workflows in `.github/workflows/` are path-filtered: changes under `frontend/` trigger frontend deploys, changes under `backend/` trigger backend build/deploy.
