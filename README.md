1. Si prefieres construir y ejecutar todo en local a partir del código extraído:
   ```bash
   # backend está en backend-src y usa su Dockerfile
   # frontend usa frontend-dist (ya contiene los assets) y el Dockerfile en la raíz
   docker compose build
   docker compose up
   ```
   Esto reemplaza las imágenes precompiladas y deja los contenedores corriendo con tu código local.

2. Ejecutar el comando `docker compose up` en la terminal.

2. Acceder al endpoint del login desde postman:
    - URL: {{DOMINIO}}:3000/api/v1/auth/login
    - Método: POST
    - Body: 
      ```json
      {
            "code": "12345678",
            "password": "12345678"
      }

3. Copiar el token que se obtiene en la respuesta del paso anterior y añadirlo como un barear token en el header de las peticiones que se realicen a los endpoints de la API.

4. Añadir a los accionistas:
    - URL: {{DOMINIO}}:3000/api/v1/users/many
    - Método: POST
    - Body: El json de accionistas que se encuentra en la presente carpeta.


**Nota sobre el frontend:**
El directorio `frontend-dist` sólo contiene los archivos generados que se sirven con nginx. No está incluido el código fuente de Ionic/Angular. Para realizar cambios en la aplicación (por ejemplo, arreglar el menú) necesitarás el repositorio original del proyecto y reconstruir el `frontend-dist` antes de ejecutar `docker compose build`.

**Configuración de la API:**
La aplicación carga `assets/env.js` al iniciar y usa la variable `env.apiUrl` para apuntar al backend. En la versión incluida este fichero apuntaba a `https://api.myapp.com`, lo que hacía que el login se quedara cargando porque no había ningún servidor en esa dirección. El `env.js` que ahora se copia al contenedor añade la URL dinámica `window.location.origin + '/api/v1'` para que siempre se conecte al mismo host donde se sirve la SPA. Si vuelves a reconstruir el frontend desde el código fuente, asegúrate de que `env.js` contenga un valor relativo o dinámico similar.

**Menú en escritorio:**
En el build original la barra lateral (`ion-menu`) sólo se mostraba en pantallas pequeñas y el botón hamburguesa aparecía siempre; en escritorio el menú se ocultaba. Para forzar que el `ion-split-pane` se active desde `md` (>=768px) y estilizar el botón, hemos añadido dos archivos estáticos:

* `assets/custom.css` – override de estilos del menú y otros componentes.
* `assets/desktop-fix.js` – script que ajusta el atributo `when` del `ion-split-pane` al cargarse y oculta el botón de menú cuando la división está visible.

Ambos ficheros se copian desde la carpeta raíz al build frontend y se incluyen en `index.html`. Si reconstruyes el frontend, no olvides copiar estos archivos al dist y seguir el mismo patrón de importación para que las opciones del menú se vean en pantalla grande.

---

## Manual de usuario

A continuación se describen los pasos básicos para usar la aplicación, tanto desde la perspectiva de un votante como de un administrador.

### 1. Arrancar la aplicación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/cghidalgos/votaciones.git
   cd votaciones
   ```
2. Construir y arrancar los contenedores:
   ```bash
   docker compose build
   docker compose up -d
   ```
3. La aplicación quedará disponible en `http://localhost:3000` (puerto configurable).

> **Nota:** la primera vez se crea y rellena la base de datos con un usuario administrdor (`12345678` / `12345678`).

### 2. Iniciar sesión (común)

- Abrir el navegador en `http://localhost:3000`.
- Introducir el número de cédula y la contraseña en la pantalla de login.
- Pulsar _Iniciar sesión_.
- Dependiendo del rol del usuario se redirige a la página de votante o a la administración.

> Si las credenciales son incorrectas, se mostrará un mensaje de error. El campo de cédula sólo acepta números.

### 3. Votante

Una vez logueado como votante (`role: voter`):

1. Se muestra la lista de encuestas activas. Cada entrada contiene título y estado.
2. Pulsar en una encuesta para ver sus opciones.
3. Seleccionar la opción deseada y confirmar el voto.
4. Sólo se permite votar una vez por encuesta; al volver a entrar la opción aparecerá deshabilitada.

El menú (hamburguesa o barra lateral) ofrece enlace a _Votar_ (página principal) y _Cerrar sesión_.

### 4. Administrador

Un usuario con rol `admin` tiene acceso a funciones adicionales desde el menú:

- **Encuestas**: crear nuevas encuestas, editar títulos/estado, eliminar.
- **Usuarios**: ver/añadir/borrar votantes (codigo, nombre, acciones).
- **Votar** no está disponible si estás en modo administrador; en su lugar puedes cambiar al modo votante desde el menú si lo deseas.

Además, al iniciar sesión como admin el sistema redirige automáticamente a la sección de administración (competición). Utiliza el panel para gestionar contenido antes y durante la votación.

### 5. Cerrar sesión

- Selecciona _Cerrar sesión_ en el menú lateral/hamburguesa.
- Serás redirigido a la pantalla de login.

---

### 6. Despliegue en producción

El repositorio incluye un `Dockerfile` en la raíz que construye la aplicación completa (backend + frontend). Se puede usar con cualquier plataforma de contenedores que soporte Docker (Render, Heroku, etc.).

Mantener actualizados los archivos en `frontend-dist` si recompilas el frontend desde el código fuente.

**NOTAS**: 
- Si se cambia el *TOKEN_SECRET* en el docker-compose.yml, el hash de la contraseña del administador debe ser actualizado en la base de datos. 

- La url del backend no puede ser *localhost* ni *backend*, debe ser la *ip de la máquina* en la que se está ejecutando el backend.