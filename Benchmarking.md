# Connection Pool size

I ran up to 2000 concurrent users without errors. At 2000 timeout errors started happening.
I will try to utilize all performance tuning measures of this base setup to improve the results. The AVG latency was 5850ms.

npx autocannon -c 2000 -d 10 -p 10 http://localhost:3000/api/users
Running 10s test @ http://localhost:3000/api/users
2000 connections with 10 pipelining factor

┌─────────┬─────────┬─────────┬─────────┬──────────┬───────────┬────────────┬──────────┐
│ Stat │ 2.5% │ 50% │ 97.5% │ 99% │ Avg │ Stdev │ Max │
├─────────┼─────────┼─────────┼─────────┼──────────┼───────────┼────────────┼──────────┤
│ Latency │ 1926 ms │ 5900 ms │ 9853 ms │ 10059 ms │ 5850.4 ms │ 2128.03 ms │ 10526 ms │
└─────────┴─────────┴─────────┴─────────┴──────────┴───────────┴────────────┴──────────┘
┌───────────┬─────┬──────┬─────────┬─────────┬──────────┬────────┬────────┐
│ Stat │ 1% │ 2.5% │ 50% │ 97.5% │ Avg │ Stdev │ Min │
├───────────┼─────┼──────┼─────────┼─────────┼──────────┼────────┼────────┤
│ Req/Sec │ 0 │ 0 │ 2,173 │ 3,021 │ 2,072.81 │ 785.26 │ 1,637 │
├───────────┼─────┼──────┼─────────┼─────────┼──────────┼────────┼────────┤
│ Bytes/Sec │ 0 B │ 0 B │ 2.53 MB │ 3.51 MB │ 2.41 MB │ 912 kB │ 1.9 MB │
└───────────┴─────┴──────┴─────────┴─────────┴──────────┴────────┴────────┘

Req/Bytes counts sampled once per second.

# of samples: 10

42k requests in 11.4s, 24.1 MB read
1k errors (1k timeouts)

# Changing mongoDB pool size from 50 to 100

Average latency down to 5612.ms, timeout up to 7k.

# Conclusion

There were no real improvements with various pool size settings.

# Redis Caching
