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
  --with github.com/grafana/xk6-faker

.\k6.exe run .\browser-test.js --config .\options.json

```

## To Do

Investigate plugins:

- https://gitlab.com/szkiba/xk6-banner
- https://github.com/szkiba/xk6-csv
- https://github.com/szkiba/xk6-dotenv
- https://github.com/grafana/xk6-faker
- https://github.com/nicholasvuono/xk6-playwright