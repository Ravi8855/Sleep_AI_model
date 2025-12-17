.PHONY: up down build logs ps shell-node shell-python clean start

up: build
	docker-compose -f infra/docker-compose.yml up -d --remove-orphans
	@echo "Services started. Node: http://localhost:4000, Python: http://localhost:5000"

down:
	docker-compose -f infra/docker-compose.yml down

build:
	docker-compose -f infra/docker-compose.yml build --no-cache

logs:
	docker-compose -f infra/docker-compose.yml logs -f

ps:
	docker-compose -f infra/docker-compose.yml ps

shell-node:
	docker exec -it $$(docker-compose -f infra/docker-compose.yml ps -q node) /bin/sh

shell-python:
	docker exec -it $$(docker-compose -f infra/docker-compose.yml ps -q python) /bin/sh

clean:
	docker-compose -f infra/docker-compose.yml down --rmi all --volumes --remove-orphans
	rm -rf backend-node/node_modules

start: up
