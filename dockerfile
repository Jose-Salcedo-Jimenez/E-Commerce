# Usa la imagen oficial de Node
FROM node:20

# Crea directorio app
WORKDIR /app

# Copia dependencias y código
COPY package*.json ./
RUN npm install

COPY . .

# Expón el puerto
EXPOSE 3000

# Usa ts-node directamente
CMD ["npm", "run", "dev"]
