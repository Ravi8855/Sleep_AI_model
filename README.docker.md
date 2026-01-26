# SleepAI - Docker Deployment Guide

This guide explains how to deploy SleepAI using Docker and Docker Compose for a production-like environment.

## 📋 Prerequisites

- Docker Desktop (v4.0+) installed and running
- Docker Compose (included with Docker Desktop)
- At least 4GB RAM allocated to Docker

## 🚀 Quick Start

From the project root directory:

1. **Start all services**
   ```bash
   make up
   ```

2. **Check running containers**
   ```bash
   make ps
   ```

3. **View service logs**
   ```bash
   make logs
   ```

4. **Stop all services**
   ```bash
   make down
   ```

## 🛠️ Makefile Commands

The project includes a comprehensive Makefile for common operations:

```bash
make up      # Build and start all services
make down    # Stop and remove containers
make build   # Rebuild Docker images
make logs    # View service logs
make ps      # List running containers
make clean   # Remove containers, networks, images, and volumes
make shell-node   # Access Node.js container shell
make shell-python # Access Python container shell
```

## 🏗️ Docker Architecture

The Docker Compose configuration defines four services:

1. **mongo**: MongoDB database
2. **node**: Node.js backend API
3. **python**: Python ML microservice
4. **frontend**: (Optional) React frontend

### Service Details

#### MongoDB (mongo)
- Image: `mongo:6`
- Port: 27017
- Volume: Persistent data storage
- Restart: Always

#### Node.js Backend (node)
- Build context: `./backend-node`
- Dockerfile: `backend-node/Dockerfile`
- Command: `npm run dev`
- Port: 4000
- Environment variables loaded from `.env`
- Depends on: mongo, python
- Volume mounts for development

#### Python ML Service (python)
- Build context: `./microservice-predict`
- Dockerfile: `microservice-predict/Dockerfile`
- Command: `python predict_service.py`
- Port: 5000
- Volume mounts for development

## ⚙️ Configuration

### Environment Variables

Ensure `backend-node/.env` is properly configured before starting:

```env
MONGO_URI=mongodb://mongo:27017/sleep_ai
PYTHON_PREDICT_URL=http://python:5000/predict
JWT_SECRET=your_secure_jwt_secret
```

### Model File

Place `sleep_model.pkl` in the `microservice-predict/` directory before starting the services.

If you don't have a model file, generate one:
```bash
cd dataset
python generate_dataset.py
python train_model.py
mv sleep_model.pkl ../microservice-predict/
cd ..
```

## 🌐 Network Configuration

All services communicate through the default Docker Compose network. Service discovery is handled automatically:

- Backend accesses MongoDB: `mongodb://mongo:27017/sleep_ai`
- Backend accesses ML service: `http://python:5000/predict`
- Frontend accesses Backend: `http://localhost:4000`
- Frontend accesses ML service: Directly through backend

## 📦 Volume Mounts

For development convenience, the following directories are mounted as volumes:

- `./backend-node:/app` - Node.js source code
- `./microservice-predict:/app` - Python source code

Changes to source code are reflected immediately without rebuilding images.

## 🔧 Troubleshooting

### Common Issues

1. **Port conflicts**
   If ports 4000, 5000, or 27017 are in use, modify `infra/docker-compose.yml` to use different ports.

2. **Model file missing**
   Ensure `sleep_model.pkl` exists in `microservice-predict/` before starting services.

3. **Connection refused errors**
   Services may take a moment to start. Check logs with `make logs`.

4. **Permission denied errors**
   On Linux, you may need to adjust file permissions for volume mounts.

### Viewing Logs

```bash
# View all logs
make logs

# View specific service logs
docker-compose -f infra/docker-compose.yml logs node

# View live logs
make logs | grep node
```

### Accessing Containers

```bash
# Access Node.js container
make shell-node

# Access Python container
make shell-python

# Access MongoDB
docker exec -it $(docker-compose -f infra/docker-compose.yml ps -q mongo) mongosh
```

## 🔄 Development Workflow

1. **Start services**
   ```bash
   make up
   ```

2. **Develop**
   - Modify code in `backend-node/` or `microservice-predict/`
   - Changes are reflected immediately

3. **Monitor**
   ```bash
   make logs
   ```

4. **Stop services**
   ```bash
   make down
   ```

## 🏭 Production Considerations

For production deployments, consider:

1. **Security**
   - Use secrets management for sensitive data
   - Enable authentication for MongoDB
   - Use production-ready Node.js and Python configurations

2. **Performance**
   - Adjust resource limits in docker-compose.yml
   - Use external MongoDB instances for better performance
   - Implement load balancing for multiple backend instances

3. **Monitoring**
   - Add health checks for all services
   - Implement centralized logging
   - Add monitoring and alerting

4. **Persistence**
   - Use named volumes for MongoDB data
   - Implement backup strategies

## 📄 License

This project is licensed under the MIT License.
