# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies

# Copy the entire project to the container
COPY . .

# Expose React's default port


# Start the React application
RUN npm install | npm install pm2 -g
#CMD [ "node", "app.js" ]
CMD ["pm2-runtime", "app.js"]
EXPOSE 3000
