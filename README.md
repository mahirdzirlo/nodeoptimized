docker-compose up -d to start a mongodb instance
npm run seed (popuplate 20k users into mongoDB for querying)

npm run build
npm run start

### Benchmarking

refer to Benchmarking.md for performance tuning and analysis.

# MongoDB in Docker Useful commands

docker-compose up -d
docker-compose down -v (to remove docker images)
docker-compose up --build -d (remove docker containers and run)
