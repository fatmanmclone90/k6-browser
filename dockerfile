FROM golang:1.23.2-alpine3.20 AS builder

WORKDIR /app

ENV CGO_ENABLED=0
RUN go install go.k6.io/xk6/cmd/xk6@v0.13.0

# Your extension's github url, I used mine as example
RUN xk6 build \
    --with gitlab.com/szkiba/xk6-banner \
    --with github.com/szkiba/xk6-dotenv \
    --with github.com/grafana/xk6-faker \
    --with github.com/grafana/xk6-dashboard@v0.7.5

FROM alpine:3.20

RUN apk add --no-cache chromium

COPY --from=builder /app/k6 /bin/
COPY .env .
COPY ./browser-test.js .
COPY ./options.json .

# Create a group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Tell docker that all future commands should run as the appuser user
USER appuser

ENTRYPOINT [ "k6", "run", "/browser-test.js" ]