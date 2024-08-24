---
sidebar_position: 100
---

# 性能测试

性能测试是一个场景复杂且依赖各种场景的流程，因此下面只是做了简单的测试场景。

CPU: M2

### Nginx（无访问日志）

nginx的只是用来做一个比对使用

```bash
wrk 'http://127.0.0.1:9080/' --latency

Running 10s test @ http://127.0.0.1:9080/
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   393.55us    2.39ms  32.81ms   97.72%
    Req/Sec    72.68k     5.98k   86.25k    87.13%
  Latency Distribution
     50%   65.00us
     75%   71.00us
     90%   78.00us
     99%   14.87ms
  1460643 requests in 10.10s, 208.95MB read
Requests/sec: 144598.99
Transfer/sec:     20.69MB
```


### Pingap（无访问日志）

```bash
wrk 'http://127.0.0.1:6188/ping' --latency

Running 10s test @ http://127.0.0.1:6188/ping
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    66.18us   28.39us   2.30ms   85.24%
    Req/Sec    74.43k     1.75k   76.25k    97.03%
  Latency Distribution
     50%   70.00us
     75%   77.00us
     90%   83.00us
     99%  100.00us
  1495363 requests in 10.10s, 195.37MB read
Requests/sec: 148056.28
Transfer/sec:     19.34MB
```

### Pingap转发至nginx

Threads: 1

```bash
wrk 'http://127.0.0.1:6188/proxy-nginx'  --latency

Running 10s test @ http://127.0.0.1:6188/proxy-nginx
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   206.46us  151.03us   7.28ms   98.62%
    Req/Sec    25.06k     1.16k   29.07k    87.13%
  Latency Distribution
     50%  211.00us
     75%  224.00us
     90%  239.00us
     99%  391.00us
  503591 requests in 10.10s, 72.04MB read
Requests/sec:  49862.65
Transfer/sec:      7.13MB
```

Threads: 2

```bash
wrk 'http://127.0.0.1:6188/proxy-nginx'  --latency

Running 10s test @ http://127.0.0.1:6188/proxy-nginx
 2 threads and 10 connections
 Thread Stats   Avg      Stdev     Max   +/- Stdev
   Latency   161.04us  753.69us  19.29ms   99.23%
   Req/Sec    44.96k     2.73k   48.65k    73.76%
 Latency Distribution
    50%  107.00us
    75%  125.00us
    90%  143.00us
    99%  299.00us
 903504 requests in 10.10s, 129.25MB read
Requests/sec:  89449.37
Transfer/sec:     12.80MB
```

Threads: 3 (设置为3个线程效果比2个线程提升很少，估计有全局的锁之类影响，后续确认)

```bash
wrk 'http://127.0.0.1:6188/proxy-nginx'  --latency

Running 10s test @ http://127.0.0.1:6188/proxy-nginx
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   111.73us  277.33us  10.84ms   99.54%
    Req/Sec    48.06k     3.35k   74.58k    87.56%
  Latency Distribution
     50%   95.00us
     75%  115.00us
     90%  134.00us
     99%  193.00us
  961184 requests in 10.10s, 137.50MB read
Requests/sec:  95160.18
Transfer/sec:     13.61MB
```

### Pingap 响应 8kb 的 html

```bash
wrk 'http://127.0.0.1:6188/downloads/index.html' --latency

Running 10s test @ http://127.0.0.1:6188/downloads/index.html
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   225.84us   59.47us   1.83ms   78.04%
    Req/Sec    22.17k     1.94k   25.25k    87.13%
  Latency Distribution
     50%  222.00us
     75%  247.00us
     90%  286.00us
     99%  418.00us
  445764 requests in 10.10s, 3.16GB read
Requests/sec:  44134.06
Transfer/sec:    320.01MB
```

### 压缩

测试客户端压缩各种不同压缩格式时的处理性能（主要耗时在压缩处理），所有压缩算法的压缩级别均选择9，实际使用按需设置。

客户端不支持压缩(响应数据24KB)

```bash
wrk 'http://localhost:6118/' --latency
Running 10s test @ http://localhost:6118/
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   110.61us   62.30us   3.71ms   87.06%
    Req/Sec    44.96k     1.13k   46.16k    93.07%
  Latency Distribution
     50%  117.00us
     75%  125.00us
     90%  133.00us
     99%  164.00us
  903688 requests in 10.10s, 22.26GB read
Requests/sec:  89474.79
Transfer/sec:      2.20GB
```

客户端支持gzip压缩(响应数据2.87KB)

```bash
wrk -H "accept-encoding: gzip" 'http://localhost:6118/' --latency
Running 10s test @ http://localhost:6118/
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.59ms  525.65us   7.55ms   86.09%
    Req/Sec     3.16k   156.64     3.36k    93.56%
  Latency Distribution
     50%    1.72ms
     75%    1.80ms
     90%    1.88ms
     99%    2.25ms
  63484 requests in 10.10s, 182.42MB read
Requests/sec:   6285.12
Transfer/sec:     18.06MB
```

客户端支持br压缩(响应数据2.46KB)

```bash
wrk -H "accept-encoding: br" 'http://localhost:6118/' --latency
Running 10s test @ http://localhost:6118/
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    16.62ms    5.41ms  54.96ms   88.28%
    Req/Sec   302.12     24.46   353.00     83.00%
  Latency Distribution
     50%   18.03ms
     75%   18.61ms
     90%   19.47ms
     99%   21.99ms
  6023 requests in 10.01s, 14.85MB read
Requests/sec:    601.55
Transfer/sec:      1.48MB
```

客户端支持zstd压缩(响应数据2.73KB)

```bash
wrk -H "accept-encoding: zstd" 'http://localhost:6118/' --latency
Running 10s test @ http://localhost:6118/
 2 threads and 10 connections
 Thread Stats   Avg      Stdev     Max   +/- Stdev
   Latency     2.19ms    0.93ms  23.19ms   85.73%
   Req/Sec     2.32k   169.74     2.50k    92.50%
 Latency Distribution
    50%    2.32ms
    75%    2.46ms
    90%    2.59ms
    99%    3.53ms
 46183 requests in 10.01s, 126.27MB read
Requests/sec:   4612.25
Transfer/sec:     12.61MB
```

客户端支持zstd压缩，服务设置为2个线程

```bash
wrk -H "accept-encoding: zstd" 'http://localhost:6118/' --latency

Running 10s test @ http://localhost:6118/
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.33ms  540.17us   9.68ms   69.88%
    Req/Sec     3.79k   201.55     4.21k    77.72%
  Latency Distribution
     50%    1.30ms
     75%    1.72ms
     90%    1.97ms
     99%    2.47ms
  76162 requests in 10.10s, 208.24MB read
Requests/sec:   7540.73
Transfer/sec:     20.62MB
```


### 缓存

Threads: 1

```bash
wrk -H 'Accept-Encoding: gzip, deflate, br, zstd' 'http://localhost:6118/cache'
Running 10s test @ http://localhost:6118/cache
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   183.82us   62.06us   2.30ms   86.60%
    Req/Sec    27.27k   554.92    28.68k    92.57%
  548062 requests in 10.10s, 2.07GB read
Requests/sec:  54263.03
Transfer/sec:    209.89MB
```

Threads: 2

```bash
wrk -H 'Accept-Encoding: gzip, deflate, br, zstd' 'http://localhost:6118/cache'
Running 10s test @ http://localhost:6118/cache
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    98.40us   47.66us   2.52ms   79.75%
    Req/Sec    50.40k     4.23k   53.03k    91.58%
  1013154 requests in 10.10s, 3.83GB read
Requests/sec: 100318.26
Transfer/sec:    388.01MB
```
