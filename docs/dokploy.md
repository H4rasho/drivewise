# Despliegue en Dokploy

Dokploy usa el `docker-compose.yml` de la raíz para orquestar los tres servicios (`db`, `api`, `web`). No se requiere configuración adicional de infraestructura.

## Requisitos previos

- Servidor con Dokploy instalado ([guía oficial](https://docs.dokploy.com))
- Repositorio en GitHub o GitLab
- Dominio con registro A apuntando a la IP del servidor

---

## 1. Conectar el repositorio

1. En Dokploy, ve a **Git** y conecta tu cuenta de GitHub (o GitLab).
2. Selecciona el repositorio `drivewise` y la rama `master` (o `main`).

---

## 2. Crear el proyecto

1. En el panel de Dokploy, crea un nuevo proyecto y selecciona el tipo **Docker Compose**.
2. En la configuración, especifica la ruta del archivo: `docker-compose.yml`.
3. Guarda sin desplegar todavía.

---

## 3. Variables de entorno

Antes del primer despliegue, configura las variables en la pestaña **Environment** del proyecto:

```env
DATABASE_URL=postgres://<usuario>:<contraseña>@db:5432/drivewise
API_PORT=3000
NODE_ENV=production
POSTGRES_DB=drivewise
POSTGRES_USER=<usuario>
POSTGRES_PASSWORD=<contraseña>
```

> Usa credenciales seguras. El valor de `DATABASE_URL` debe coincidir con `POSTGRES_USER` y `POSTGRES_PASSWORD`.

---

## 4. Dominio y SSL

1. Ve a la pestaña **Domains** del servicio `web`.
2. Agrega tu dominio (ej. `drivewise.tudominio.com`).
3. Activa **HTTPS** — Dokploy genera y renueva el certificado via Let's Encrypt automáticamente.

El servicio `web` (nginx) ya incluye el proxy `/api → api:3000`, por lo que solo necesitas exponer `web` públicamente. No expongas `api` ni `db` directamente.

---

## 5. Primer despliegue

1. Haz clic en **Deploy** en el panel de Dokploy.
2. Una vez que los contenedores estén corriendo, ejecuta las migraciones desde la pestaña **Advanced → Run Command** del servicio `api`:

```bash
bun run db:migrate
```

Si el proyecto tiene datos iniciales:

```bash
bun run db:seed
```

---

## 6. Actualizaciones

Cada push a la rama configurada dispara un nuevo despliegue automático (solo GitHub). Para GitLab o despliegues manuales, usa el botón **Deploy** en el panel.

Si el push incluye cambios de schema, corre las migraciones después del despliegue desde **Advanced → Run Command**.

---

## Resumen de puertos

| Servicio | Puerto | Expuesto públicamente |
|----------|--------|----------------------|
| `web`    | 80     | Sí (via dominio)     |
| `api`    | 3000   | No                   |
| `db`     | 5432   | No                   |
