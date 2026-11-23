FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY angular.json tsconfig.json ./
COPY src ./src
RUN npm run build

FROM nginx:1.28-alpine
COPY --from=build /app/dist/bodegas-frontend/browser /usr/share/nginx/html
EXPOSE 80
