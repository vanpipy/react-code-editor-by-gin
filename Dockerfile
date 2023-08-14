FROM alpine:3.14
ADD app .
RUN ./app/server
