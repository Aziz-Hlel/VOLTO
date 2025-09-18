# Colors for output
GREEN := \033[0;32m]
YELLOW := \033[1;33m]
RED := \033[0;31m]
NC := \033[0m] 

.PHONY: docker-dev-up docker-stage-up docker-up


ROOT := $(shell git rev-parse --show-toplevel)

DOCKER_ROOT := $(ROOT)/docker


# ENVs
ENV_LOCAL := $(ROOT)/.env.local
ENV_ROOT := $(ROOT)/.env
ENV_DEV := $(ROOT)/config/.env.dev
ENV_STAGE := $(ROOT)/config/.env.stage
ENV_PROD := $(ROOT)/config/.env



.ONESHELL:
docker-dev-up:
	@echo "${YELLOW}🚀 Starting Docker in Dev Env..."
	@cd $(ROOT) 
	@set -a && . $(ENV_DEV) && . $(ENV_LOCAL) && . $(ENV_ROOT) && set +a;
	@docker compose \
	  -f $(DOCKER_ROOT)/compose.dev.yml up --build
	@echo "${GREEN}✅ "


docker-stage-up:
	@echo "🚀 Starting staging environment..."
	@docker compose -f $(DOCKER_ROOT)/compose.stage.yml up --build
	@echo "✅ Staging environment started"

docker-up:
	@echo "🚀 Starting production environment..."
	@docker compose up --build
	@echo "✅ Production environment started"
