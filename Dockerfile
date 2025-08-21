# Étape 1 : Build avec pnpm
FROM node:20-alpine AS builder

# Installer pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les deps
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances
RUN pnpm install --frozen-lockfile

# Copier le reste du code
COPY . .

# Build du projet
RUN pnpm run build

# Étape 2 : Image finale avec nginx
FROM nginx:stable-alpine3.21 AS runner

# Supprimer la conf par défaut de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier notre conf nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
