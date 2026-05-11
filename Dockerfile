FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG VITE_MP_PUBLIC_KEY
ARG MP_PUBLIC_KEY
RUN export VITE_MP_PUBLIC_KEY="${VITE_MP_PUBLIC_KEY:-$MP_PUBLIC_KEY}" && npm run build

FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
