# Node API optimized for large number of users

docker-compose up -d to start a mongodb instance
npm run seed (popuplate 20k faked users into mongoDB for querying)

npm run build
npm run start

execute autocannon with loadtesting parameters ie.

npx autocannon -c 2000 -d 10 -p 10 http://localhost:3000/api/users

### Benchmarking

refer to Benchmarking.md for performance tuning and analysis.

# MongoDB in Docker Useful commands

docker-compose up -d
docker-compose down -v (to remove docker images)
docker-compose up --build -d (remove docker containers and run)
