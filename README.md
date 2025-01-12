Application Overview
The project consists of:

Frontend: A React.js application serving the user interface.
Backend: Node.js/Express server to handle API requests and MongoDB integration.
Database: MongoDB for storing CRUD data.
Prerequisites
Docker and Docker Compose installed.
Node.js and MongoDB locally installed for testing outside of Docker.
Cloned project:
bash
Copy code
git clone https://github.com/wwassim/devops-crud.git
cd devops-crud
Docker Files Created
1. Dockerfile for the React Frontend
A Dockerfile was created in the React app folder (frontend/):

dockerfile
Copy code
# Use the Node.js image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use an Nginx server to serve the production build
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
2. Dockerfile for the Node.js Backend
A Dockerfile was created for the Node.js API (backend/):

dockerfile
Copy code
# Use the Node.js image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the backend port (e.g., 5000)
EXPOSE 5000

# Start the Node.js server
CMD ["npm", "start"]
MongoDB Service Setup
MongoDB was added as a service in docker-compose.yml. This enables data persistence within a named volume.

Docker Compose Configuration
A docker-compose.yml file was created at the root level to define and manage the services:

yaml
Copy code
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/devops-crud
    depends_on:
      - mongo

  mongo:
    image: mongo:5.0
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
Steps Followed
Dockerized React Frontend:

Created a multistage Dockerfile to build and serve the React app with Nginx.
Dockerized Node.js Backend:

Set up a Dockerfile to containerize the API server.
Connected the backend to MongoDB using an environment variable MONGO_URI.
Integrated MongoDB:

Used the official MongoDB Docker image.
Created a volume (mongodb_data) to persist data.
Configured Docker Compose:

Connected frontend, backend, and MongoDB services via docker-compose.yml.
How to Run the Application
Clone the Repository:

bash
Copy code
git clone https://github.com/wwassim/devops-crud.git
cd devops-crud
Start Services with Docker Compose:

bash
Copy code
docker-compose up --build
Access the Application:

React Frontend: http://localhost:3000
Backend API: http://localhost:5000
MongoDB: localhost:27017 (via database clients like Compass)
Stop Services:

bash
Copy code
docker-compose down
Troubleshooting
Check Logs:

bash
Copy code
docker-compose logs -f
Rebuild Services:
If code changes aren't reflected, rebuild the containers:

bash
Copy code
docker-compose up --build
This setup containerizes your full-stack devops-crud application, enabling smooth deployment and scaling.

Would you like to add diagrams, example .env files, or any additional sections?







