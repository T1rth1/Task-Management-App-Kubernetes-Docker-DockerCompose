# Stage 1: Build React (Vite)
FROM node:18-alpine AS build

WORKDIR /app

# for this detailed explanation is there in the notes of the docker deployment for task management app 
# Declare build args
ARG VITE_APP_BASE_URL
ARG VITE_APP_FIREBASE_API_KEY

# Set as env vars so Vite can read them at build time
ENV VITE_APP_BASE_URL=$VITE_APP_BASE_URL
ENV VITE_APP_FIREBASE_API_KEY=$VITE_APP_FIREBASE_API_KEY

# Copy package files first (for caching)
COPY package*.json ./

RUN npm install

# Copy all source code
COPY . .

# Build the app (Vite → dist folder)
RUN npm run build


# Stage 2: Nginx server
FROM nginx:alpine

# Copy custom nginx config (overwrites default)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]