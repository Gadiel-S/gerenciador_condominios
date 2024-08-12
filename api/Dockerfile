# Estágio de build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Estágio de produção
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app ./
RUN npm install --only=production

EXPOSE 4000

CMD ["node", "dist/main.js"]