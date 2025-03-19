# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json first and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Expose frontend port
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
