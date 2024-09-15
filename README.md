# Backend para Gestión de Usuarios y Envío de SMS

Este proyecto es una aplicación backend construida con NestJS que maneja usuarios, guarda fotos de perfil en Firebase Storage y envía mensajes de texto utilizando la API de Twilio. Utiliza Firebase para el almacenamiento y gestión de datos, incluyendo la carga de imágenes de perfil en Firebase Storage.

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables con los valores correspondientes de tu cuenta de Firebase y Twilio:

   ```env
   FIREBASE_PROJECT_ID=<TU_FIREBASE_PROJECT_ID>
   FIREBASE_PRIVATE_KEY=<TU_FIREBASE_PRIVATE_KEY>
   FIREBASE_CLIENT_EMAIL=<TU_FIREBASE_CLIENT_EMAIL>
   FIREBASE_STORAGE_BUCKET=<TU_FIREBASE_BUCKET>
   TWILIO_ACCOUNT_SID=<TU_TWILIO_ACCOUNT_SID>
   TWILIO_AUTH_TOKEN=<TU_TWILIO_AUTH_TOKEN>
   TWILIO_PHONE_NUMBER=<TU_TWILIO_PHONE_NUMBER>
   ```

## Uso

### Iniciar el Servidor

Para iniciar el servidor de desarrollo, usa el siguiente comando:

npm run start






### Endpoints

## Crear Usuario

Ruta: POST /users

Descripción: Crea un nuevo usuario, incluyendo la carga de una foto de perfil.

Cuerpo de la solicitud:

json
{
"name": "Nombre del Usuario",
"phone": "Número de Teléfono",
"profilePictureFile": "Archivo de Imagen"
}

Respuesta:

json
{
"message": "User created successfully",
"userId": "<ID_DEL_USUARIO>"
}

## Obtener Usuarios

Ruta: GET /users

Descripción: Obtiene una lista de todos los usuarios.

Respuesta:

json
[{
"name": "Nombre del Usuario",
"phone": "Número de Teléfono",
"profilePicture": "<URL_DE_LA_IMAGEN>"
}]

## Ruta: POST /sms/send

Enviar SMS

Descripción: Envía un SMS al número de teléfono especificado si el usuario está registrado en la base de datos.

Cuerpo de la solicitud:

json
{
"phone": "Número de Teléfono",
"message": "Contenido del Mensaje"
}
Respuesta:

json
{
"success": true,
"message": "SMS sent successfully",
"response": "<RESPUESTA_DE_TWILIO>"
}

### Configuración de Firebase y Twilio

Firebase: Asegúrate de tener un proyecto en Firebase y de haber generado una clave de servicio. Consulta la documentación de Firebase para más detalles. La carga de imágenes de perfil se gestiona a través de Firebase Storage.

Twilio: Crea una cuenta en Twilio y obtiene las credenciales necesarias. Consulta la documentación de Twilio para más información.
