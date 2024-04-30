#!/bin/bash

# Navegar a la carpeta e2e en tu directorio home
cd ~/e2e

# Vaciar la carpeta e2e
rm -rf *

# Clonar el repositorio
git clone https://github.com/Arquisoft/wiq_es05c.git
cd wiq_es05c

# Configurar Node.js
nvm install 21
nvm use 21

# Instalar dependencias y construir la aplicación web
npm --prefix users/authservice install
npm --prefix users/userservice install
npm --prefix gatewayservice install
npm --prefix historyservice install
npm --prefix questionservice install
npm --prefix roomservice install
npm --prefix webapp install
npm --prefix webapp run build

# Ejecutar pruebas e2e
xvfb-run --auto-servernum npm --prefix webapp run test:e2e