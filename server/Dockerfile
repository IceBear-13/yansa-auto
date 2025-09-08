# Build stage
FROM node:latest AS build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:latest AS production

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ciq

COPY .env .env

# Copy built application from build stage
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]