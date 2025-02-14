# Use official Node.js image as base
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use an Nginx server to serve the Angular app
FROM nginx:alpine

# Copy built Angular files to Nginx
COPY --from=build /app/dist/spinal /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
