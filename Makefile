APP=app
export GO111MODULE=on

default: init build

.PHONY: initialization
init: init-server init-client

.PHONY: client initialization
init-client:
	@echo "> Installing the client dependencies"
	@cd client && npm install

.PHONY: server initialization
init-server:
	@echo "> Installing the server dependencies"
	@cp .env.dev .env
	@go mod tidy -v
	@go install github.com/cosmtrek/air@latest

.PHONY: test client
test-client:
	@echo "> Testing the client"
	@cd ./client && npm test

.PHONY: test server
test-server:
	@echo "> Testing the server"
	@cd ./server && go test

.PHONY: build
build: build-server build-client

.PHONY: build client
build-client:
	@echo "> Building the client"
	@cd ./client && npm run build

.PHONY: build server
build-server:
	@echo "> Building the server binary"
	@rm -rf ${APP} && mkdir ${APP}
	@cp .env.prod .env
	@cp .env.prod ${APP}/.env
	@go build -C server -o ../${APP} .

.PHONY: local development
serve:
	@echo "> serving"
	./client/node_modules/.bin/concurrently "cd client && npm run build" "air"
