# Utilizzo Nginx come server web leggero
FROM nginx:alpine

# Copio i file del sito nella directory di default di Nginx
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/

# Configurazione Nginx ottimizzata per servire file statici
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache per le immagini \
    location ~* \.(png|jpg|jpeg|gif|ico|svg)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Cache per CSS e JS \
    location ~* \.(css|js)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Compressione gzip \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; \
}' > /etc/nginx/conf.d/default.conf

# Espongo la porta 80
EXPOSE 80

# Comando di avvio (già definito nell'immagine base nginx:alpine)
CMD ["nginx", "-g", "daemon off;"]


