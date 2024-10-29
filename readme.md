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
  