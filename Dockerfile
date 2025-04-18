# Development image - using Node.js 20 for ARM64
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy .env file
COPY .env ./

# Copy source code
COPY . .

# Expose the development server port
# Note: Vite typically uses port 5173 by default
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
