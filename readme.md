# K6 with Browser

Playing around with K6 extensions.

## Running Tests

Execute:

```Powershell
cat browser-test.js | docker run --rm -i grafana/k6:0.54.0-with-browser run -
```

Execute with options:

```Powershell
docker run --rm -i -v ${PWD}:/app -w /app grafana/k6:0.54.0-with-browser --config options.json browser-test.js
```

Executing with extensions:

```Powershell
docker run --rm -e GOOS=windows -v "${PWD}:/xk6" `
  grafana/xk6:0.13.0 build --output k6.exe `
  --with gitlab.com/szkiba/xk6-banner `
  --with github.com/szkiba/xk6-dotenv `
  --with github.com/grafana/xk6-faker `
  --with github.com/grafana/xk6-dashboard@v0.7.5

.\k6.exe run .\browser-test.js --config .\options.json

```

## Datadog Output

Run Datadog agent on machine:

```Powershell
docker run --rm -d `
    --name datadog `
    -v /var/run/docker.sock:/var/run/docker.sock:ro `
    -v /proc/:/host/proc/:ro `
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro `
    -e DD_SITE="datadoghq.eu" `
    -e DD_API_KEY=<API KEY> `
    -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=1 `
    -p 8125:8125/udp `
    datadog/agent:latest

```

Update environment variable `K6_STATSD_ENABLE_TAGS=true`

```PowerEYshell
docker run --rm -e GOOS=windows -v "${PWD}:/xk6" `
  grafana/xk6:0.13.0 build --output k6.exe `
  --with gitlab.com/szkiba/xk6-banner `
  --with github.com/szkiba/xk6-dotenv `
  --with github.com/grafana/xk6-faker `
  --with github.com/LeonAdato/xk6-output-statsd `
  --with github.com/grafana/xk6-dashboard@v0.7.5

.\k6.exe run .\browser-test.js --config .\options.json --out output-statsd

```

## Dockerfile

- Only supports Chromium browser

Build

```Powershell
docker build . -t k6-docker
```

Execute

```Powershell
docker run -it k6-docker --config options.json 
```

## To Do

- Investigate plugins:
  - https://github.com/szkiba/xk6-csv
- Dockerfiles
  - Override config using mount
  - Extract HTML report
  