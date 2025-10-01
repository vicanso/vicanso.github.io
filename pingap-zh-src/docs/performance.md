---
sidebar_position: 161
---

# 性能测试

性能测试是一个场景复杂且依赖各种场景的流程，因此下面只是做了简单的测试场景。

```
Architecture:     x86_64 (架构)
CPU op-mode(s):   32-bit, 64-bit
Byte Order:       Little Endian
CPU(s):           16       (总逻辑核心数/线程数)
On-line CPU(s) list: 0-15
Thread(s) per core: 2        (每个物理核心的线程数，2代表开启了超线程)
Model name:       Intel(R) Core(TM) i5-13400 @ 4.60GHz (CPU型号)
L3 cache:         20 MiB   (L3缓存大小，对性能影响显著)
```


```bash
ulimit -n 65536
sudo sysctl -w net.core.somaxconn=65535
sudo sysctl -w net.ipv4.tcp_tw_reuse=1
sudo sysctl -w net.ipv4.ip_local_port_range="1024 65535"
```

### Nginx（无访问日志）

nginx的只是用来做一个比对使用

```bash
wrk -c 1000 -t 10 'http://127.0.0.1:8080/api/json' --latency
Running 10s test @ http://127.0.0.1:8080/api/json
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    15.97ms   63.05ms   1.02s    95.53%
    Req/Sec    20.22k     1.62k   27.58k    90.20%
  Latency Distribution
     50%    4.66ms
     75%    4.72ms
     90%    4.81ms
     99%  336.44ms
  2011820 requests in 10.03s, 640.82MB read
  Socket errors: connect 0, read 2986, write 0, timeout 0
Requests/sec: 200591.12
Transfer/sec:     63.89MB
```



### Pingap转发至nginx

Threads: 1

```bash
wrk -c 1000 -t 10 --latency http://127.0.0.1:8090/api/test
Running 10s test @ http://127.0.0.1:8090/api/test
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    38.75ms   51.25ms 193.70ms   79.22%
    Req/Sec    14.16k     1.91k   20.05k    71.10%
  Latency Distribution
     50%    1.79ms
     75%   75.46ms
     90%  127.35ms
     99%  161.89ms
  1408545 requests in 10.02s, 374.78MB read
Requests/sec: 140565.72
Transfer/sec:     37.40MB
```

Threads: 2

```bash
wrk -c 1000 -t 10 --latency http://127.0.0.1:8090/api/test
Running 10s test @ http://127.0.0.1:8090/api/test
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.63ms   10.23ms  69.29ms   80.18%
    Req/Sec    23.66k     1.44k   26.51k    87.40%
  Latency Distribution
     50%    1.72ms
     75%   15.59ms
     90%   25.36ms
     99%   36.10ms
  2354115 requests in 10.03s, 626.37MB read
Requests/sec: 234789.28
Transfer/sec:     62.47MB
```

Threads: 3

```bash
wrk -c 1000 -t 10 --latency http://127.0.0.1:8090/api/test
Running 10s test @ http://127.0.0.1:8090/api/test
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.97ms    3.91ms  43.27ms   81.21%
    Req/Sec    32.74k     1.13k   35.76k    87.20%
  Latency Distribution
     50%    1.64ms
     75%    6.51ms
     90%    9.81ms
     99%   15.25ms
  3257197 requests in 10.02s, 866.66MB read
Requests/sec: 324922.79
Transfer/sec:     86.45MB
```

Threads: 4

```bash
wrk -c 1000 -t 10 --latency http://127.0.0.1:8090/api/test
Running 10s test @ http://127.0.0.1:8090/api/test
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.92ms    2.49ms  24.68ms   78.64%
    Req/Sec    39.91k   813.08    42.53k    69.60%
  Latency Distribution
     50%    1.71ms
     75%    4.55ms
     90%    6.64ms
     99%   10.23ms
  3970942 requests in 10.02s, 1.03GB read
Requests/sec: 396274.98
Transfer/sec:    105.44MB
```

### Pingap 响应 230kb 的 css

Threads: 4

```bash
wrk -c 1000 -t 10 --latency http://127.0.0.1:8090/bootstrap.min.css
Running 10s test @ http://127.0.0.1:8090/bootstrap.min.css
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    67.17ms   34.21ms   1.09s    70.01%
    Req/Sec   744.58    263.37     1.35k    63.00%
  Latency Distribution
     50%   64.98ms
     75%   90.87ms
     90%  105.10ms
     99%  124.30ms
  74121 requests in 10.02s, 16.05GB read
Requests/sec:   7393.88
Transfer/sec:      1.60GB
```

### 压缩

测试客户端压缩各种不同压缩格式时的处理性能，压缩算法使用的压缩级别为：gzip(6)， br(6)，zstd(6)，实际使用按需设置，`Pingap` 均设置为4线程。


客户端支持gzip压缩(响应数据30.2KB)

```bash
wrk -c 1000 -t 10 --latency -H "accept-encoding: gzip" http://127.0.0.1:8090/bootstrap.min.css
Running 10s test @ http://127.0.0.1:8090/bootstrap.min.css
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   306.29ms  124.46ms   1.33s    56.06%
    Req/Sec   160.07     76.51   660.00     74.57%
  Latency Distribution
     50%  310.72ms
     75%  418.42ms
     90%  468.79ms
     99%  525.62ms
  15948 requests in 10.02s, 468.26MB read
Requests/sec:   1591.26
Transfer/sec:     46.72MB
```

客户端支持br压缩(响应数据26.8KB)

```bash
wrk -c 1000 -t 10 --latency -H "accept-encoding: br" http://127.0.0.1:8090/bootstrap.min.css
Running 10s test @ http://127.0.0.1:8090/bootstrap.min.css
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   481.04ms  188.25ms   1.63s    68.02%
    Req/Sec   102.31     52.41   610.00     84.20%
  Latency Distribution
     50%  479.02ms
     75%  630.50ms
     90%  727.51ms
     99%  825.87ms
  10058 requests in 10.02s, 254.64MB read
Requests/sec:   1003.75
Transfer/sec:     25.41MB
```

客户端支持zstd压缩(响应数据29.0KB)

```bash
wrk -c 1000 -t 10 --latency -H "accept-encoding: zstd" http://127.0.0.1:8090/bootstrap.min.css
Running 10s test @ http://127.0.0.1:8090/bootstrap.min.css
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   295.13ms  129.33ms   1.45s    66.63%
    Req/Sec   166.25     53.38   510.00     76.48%
  Latency Distribution
     50%  284.72ms
     75%  391.32ms
     90%  466.32ms
     99%  574.70ms
  16562 requests in 10.03s, 464.94MB read
Requests/sec:   1651.31
Transfer/sec:     46.36MB
```


### 缓存

使用缓存插件，将数据按压缩类型缓存，由于此时压缩仅在首次时执行，因此无论哪种压缩方式均对资源占用很多，`Pingap` 均设置为4线程。

以下的压测结果可以看出，同样是设置4线程，`Requests/sec`由`1651`提升到`160583`，近百倍的提升。


```bash
wrk -c 1000 -t 10 --latency -H "accept-encoding: zstd" http://127.0.0.1:8090/bootstrap.min.css
Running 10s test @ http://127.0.0.1:8090/bootstrap.min.css
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.42ms    4.55ms  32.84ms   69.08%
    Req/Sec    16.17k   472.05    17.52k    68.70%
  Latency Distribution
     50%    4.46ms
     75%   10.18ms
     90%   13.01ms
     99%   17.80ms
  1608492 requests in 10.02s, 45.01GB read
Requests/sec: 160583.24
Transfer/sec:      4.49GB
```
