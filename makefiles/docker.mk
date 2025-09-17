

.PHONY: docker-dev-up docker-stage-up docker-up


ROOT := $(shell git rev-parse --show-toplevel)
DOCKER_ROOT := $(ROOT)/docker



docker-dev-up:
	@echo "🚀 Starting development environment..."
	@docker compose -f $(DOCKER_ROOT)/compose.dev.yml up --build
	@echo "✅ Development environment started"

docker-stage-up:
	@echo "🚀 Starting staging environment..."
	@docker compose -f $(DOCKER_ROOT)/compose.stage.yml up --build
	@echo "✅ Staging environment started"

docker-up:
	@echo "🚀 Starting production environment..."
	@docker compose up --build
	@echo "✅ Production environment started"
