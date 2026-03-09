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

**NOTAS**: 
- Si se cambia el *TOKEN_SECRET* en el docker-compose.yml, el hash de la contraseña del administador debe ser actualizado en la base de datos. 

- La url del backend no puede ser *localhost* ni *backend*, debe ser la *ip de la máquina* en la que se está ejecutando el backend.