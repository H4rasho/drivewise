# DriveWise

Plataforma para aprender a conducir con guías prácticas, estacionamiento paso a paso y recordatorios de mantención.

## Stack

- **API** — Bun + Hono + Drizzle ORM + PostgreSQL
- **Web** — React 19 + Vite + Tailwind CSS v4
- **Shared** — Schemas y tipos compartidos con Zod

---

## Desarrollo local

### Requisitos

- [Docker](https://www.docker.com/) y Docker Compose
- [Bun](https://bun.sh/) >= 1.2

### 1. Variables de entorno

```bash
cp .env.example .env
```

El `.env` por defecto funciona sin cambios para desarrollo local.

### 2. Levantar el stack

```bash
bun run docker:dev
```

Esto construye las imágenes e inicia los tres servicios con hot reload:

| Servicio | URL                   |
|----------|-----------------------|
| Web      | http://localhost:5173 |
| API      | http://localhost:3000 |
| DB       | localhost:5432        |

Los cambios en `apps/api/` y `apps/web/` se reflejan automáticamente sin reconstruir la imagen.

### 3. Migraciones y seed

En una terminal separada (con el stack corriendo):

```bash
bun run db:migrate   # aplica migraciones
bun run db:seed      # carga datos iniciales
```

### Otros comandos útiles

```bash
bun run db:generate  # genera migraciones a partir del schema
bun run db:studio    # abre Drizzle Studio en el navegador
bun run docker:dev:down  # detiene y elimina los contenedores
```

---

## Producción

### Requisitos

- Servidor con Docker y Docker Compose
- Dominio con SSL (recomendado: nginx como reverse proxy externo o Traefik)

### 1. Variables de entorno

Crea un `.env` en el servidor con valores seguros:

```env
DATABASE_URL=postgres://<user>:<password>@db:5432/drivewise
API_PORT=3000
NODE_ENV=production
```

> Nunca uses las credenciales por defecto (`drivewise_dev`) en producción.

### 2. Construir y levantar

```bash
docker compose up -d --build
```

Esto levanta tres servicios:

| Servicio | Puerto interno | Descripción                    |
|----------|---------------|--------------------------------|
| `db`     | 5432          | PostgreSQL (no expuesto)       |
| `api`    | 3000          | API REST                       |
| `web`    | 8080          | React SPA servida con nginx    |

El servicio `web` incluye un proxy `/api → api:3000`, por lo que solo necesitas exponer el puerto `8080` públicamente.

### 3. Migraciones

Después del primer deploy y en cada actualización con cambios de schema:

```bash
docker compose exec api bun run db:migrate
```

### 4. Reverse proxy (ejemplo con nginx externo)

```nginx
server {
    listen 443 ssl;
    server_name tudominio.com;

    ssl_certificate     /etc/ssl/certs/tudominio.pem;
    ssl_certificate_key /etc/ssl/private/tudominio.key;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Actualizar en producción

```bash
git pull
docker compose up -d --build
docker compose exec api bun run db:migrate
```

---

## Estructura del repositorio

```
drivewise/
├── apps/
│   ├── api/          # Backend (Hono + Drizzle)
│   └── web/          # Frontend (React + Vite)
├── packages/
│   └── shared/       # Tipos y schemas compartidos
├── docker-compose.yml      # Stack de producción
└── docker-compose.dev.yml  # Stack de desarrollo con hot reload
```
