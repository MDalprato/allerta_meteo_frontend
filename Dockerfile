# Usa un'immagine di base di Node.js
FROM node:14

# Imposta la directory di lavoro
WORKDIR /app

# Copia il package.json e il package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dell'applicazione
COPY . .

# Compila l'applicazione
RUN npm run build

# Usa un'immagine di base di Nginx per servire l'applicazione
FROM nginx:alpine

# Copia i file compilati nella directory di Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Esponi la porta 80
EXPOSE 80

# Avvia Nginx
CMD ["nginx", "-g", "daemon off;"]