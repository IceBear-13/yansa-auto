# Yansa Auto

Yansa Auto is a full-stack web application for an online car showroom, built with React, TypeScript, Vite, and a Node.js backend. It provides a seamless experience for users to browse, discover, and connect with quality vehicles.

## Features

- Modern responsive UI with Tailwind CSS
- About page with company story, mission, and values
- Contact and FAQ support pages
- Legal and social links in the footer
- Backend powered by Drizzle ORM and Node.js
- Docker support for both client and server
- ESLint and TypeScript for code quality

## Project Structure
client/ # Frontend React app server/ # Backend Node.js API

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Docker (optional)

### Setup

#### Client

```sh
cd client
npm install
npm run dev
```

# Server
```sh
cd server
npm install
npm run dev
```

## Docker
### To run both client and server with Docker:
```sh
cd client
docker build -t yansa-auto-client .
docker run -p 5173:80 yansa-auto-client

cd ../server
docker build -t yansa-auto-server .
docker run -p 3000:3000 yansa-auto-server
```

## Scripts
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run lint` – Run ESLint


## Technologies
- React, TypeScript, Vite
- Tailwind CSS
- Drizzle ORM, Node.js
- Docker
