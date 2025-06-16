# Use official Node.js image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json  to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code into the container
COPY . .
RUN npm run build

# Use nginx to serve the static files
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]