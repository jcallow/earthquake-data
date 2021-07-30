FROM node:12 as node-builder
WORKDIR /app
COPY client/earthquakes-ui .

WORKDIR /app/earthquakes-ui

RUN npm install
RUN npm run build

FROM golang:1.16.0-stretch as go-builder

RUN apt-get update && apt-get install -y ca-certificates

WORKDIR /app
COPY cmd/earthquakes-service .

RUN go get -d
RUN go build -o main .

FROM busybox:1-glibc

WORKDIR /app/
COPY --from=go-builder /app/main /app/main

WORKDIR /app/static/
COPY --from=node-builder /app/build/* .
COPY --from=node-builder /app/build/static .
COPY --from=go-builder /etc/ssl/certs /etc/ssl/certs

WORKDIR /app/
CMD ./main