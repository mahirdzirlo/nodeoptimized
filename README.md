# Node API optimized for large number of users

docker-compose up -d to start a mongodb instance
npm run seed (popuplate 20k faked users into mongoDB for querying)

npm run build
npm run start (single core used)
npm run startmax (all cores used 15 instances in my case)

execute autocannon with loadtesting parameters ie.

npx autocannon -c 2000 -d 10 -p 10 http://localhost:3000/api/users

### Benchmarking

refer to Benchmarking.md for performance tuning and analysis.
### Redis Cache

Redis caching layer is implemented to optimize read performance:

1. Start Redis alongside MongoDB:


# MongoDB in Docker Useful commands

docker-compose up -d
docker-compose down -v (to remove docker images)
docker-compose up --build -d (remove docker containers and run)
