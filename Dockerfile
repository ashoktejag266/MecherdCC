# Use Node.js 22 for ARM64
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (use npm ci for cleaner installs)
RUN npm ci

# Copy environment variables
COPY .env ./

# Copy source code
COPY . .

# Expose the Vite development port (default: 5173)
EXPOSE 5173

# Start the Vite dev server and allow external access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
