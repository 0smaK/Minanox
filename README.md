# MIÑANOX
¡Hola! Esta es mi candidatura, se llama Miñanox, por nuestro Dios, Miñano, en la 
escuela.

El proyecto es un "juego" basado en el famoso juego Pou pero con 
Miñano y combinando mecanicas de otros juegos como sistemas de cofres, 
todo con una tematica "hacker", el juego está plagado de referencias a la 
informática, la escuela y la cultura hacker.

Está desarrollado en JavaScript tanto para el back-end como el 
front-end intentando seguir las pautas de EcmaScript6 pero al final 
todo queda en un codigo espagueti gigante...

***

![Miñanox Logo](https://i.imgur.com/q45kuVf.png)


## Iniciar servidor y aplicación

- Abrir un terminal y ejecutar `npm run dev` o el comando asignado en packages.json dentro de './miñanox'
- Si todo va bien y el puerto 4000 no está en uso, abre tu navegador favorito y abre la url 'localhost:4000'

## Instalación:

### ¿Qué necesitamos?


### Tener instalado node.js y npm
  
**Windows:**
Instalar a traves de sus páginas oficiales
[node.js](https://nodejs.org/en/download/) 
[npm](https://www.npmjs.com/)
 
**linux:**
- **Arch:** `sudo pacman -S nodejs npm`
- **Debian, Ubuntu:** `sudo apt-get install nodejs npm`

### Dependencias de node.js

  `npm i express express-handlebars express-session mysql express-mysql-session morgan bcryptjs passport passport-local connect-flash express-validator`

### Tener instalado MySQL o mariaDB e iniciar servicios
*puedes usar phpmyadmin para facilitarlo*

**Arch:** 
```
sudo pacman -S mariadb
sudo mysql_install_db
sudo systemctl enable mysqld
sudo systemctl start mysqld
```
**Debian:** 
```
sudo apt-get update
sudo apt-get -y install mariadb-server mariadb-client
sudo mysql_secure_installation
```
 **Windows**
 [Pagina de descarga de MariaDB](https://downloads.mariadb.org/)
 
 ### Configurar bases de datos

Una vez hayamos instalado nodejs, npm, mysql, dependencias de nodejs, nos tocará configurar las tablas de la base de datos
Importa la base de datos del proyecto desde el .sql en `'./miñanox/database/minanox.sql'`
        
### Configurar keys base de datos
Por ultimo para que la aplicación se pueda conectar a MySQL necesitamos configurar las claves
- Dirigete a `'./miñanox/src/keys.js'`
- Sustituye `'aaa'`, `'bbb'`, etc... por el host, usuario, password correspondiente

---

## Screenshots
![login](https://i.imgur.com/QlKurGu.png)
![main](https://i.imgur.com/MeXm45V.png)
![minigames menu](https://i.imgur.com/WDObix5.png)
![miñanoClicker](https://i.imgur.com/qB97Uez.png)
![coffeeShell](https://i.imgur.com/r5k7mE8.png)
![Skin miñAND](https://i.imgur.com/TrmBVXQ.png)

---

## Atención

- El proyecto está pensado para correr en pantallas grandes con una resolución de 1920x1080
- Ha sido probado con resoluciones más pequeñas como 1366x768 comportandose bien
- Recomendamos usar Firefox o Chrome como navegador que son los navegadores en los que ha sido probado
- Asegura haber configurado todas las bases de datos
- El juego es solo una beta, no me queda tiempo para programar más minijuegos y mecánicas
