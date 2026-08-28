# Colors for output (fixed)
GREEN  := \033[0;32m
YELLOW := \033[1;33m
RED    := \033[0;31m
NC     := \033[0m

.PHONY: docker-dev-up docker-stage-up docker-up


ROOT := $(shell git rev-parse --show-toplevel)

DOCKER_ROOT := $(ROOT)/docker


# ENVs
ENV_LOCAL := $(ROOT)/.env.local
ENV_ROOT := $(ROOT)/.env
ENV_INFRA := $(ROOT)/config/.env.infra
ENV_DEV := $(ROOT)/config/.env.dev
ENV_STAGE := $(ROOT)/config/.env.stage
ENV_PROD := $(ROOT)/config/.env




.ONESHELL:
docker-infra-up:
	@echo "${YELLOW}🚀 Starting Docker in Infra Env..."
	@cd $(ROOT) 
	# Ensure local env files exist
	@touch $(ENV_LOCAL) $(ENV_ROOT) $(ENV_INFRA)
	@set -a && . $(ENV_INFRA) && . $(ENV_LOCAL) && . $(ENV_ROOT) && set +a;
	@export PROJECT_ROOT=$(ROOT)
	@docker compose -f $(DOCKER_ROOT)/compose.infra.yml up --build
	@echo "${GREEN}✅ "


docker-dev-up:
	@echo "${YELLOW}🚀 Starting Docker in Dev Env..."
	@cd $(ROOT) 
	# Ensure local env files exist
	@touch $(ENV_LOCAL) $(ENV_ROOT)
	@set -a && . $(ENV_DEV) && . $(ENV_LOCAL) && . $(ENV_ROOT) && set +a;
	@export PROJECT_ROOT=$(ROOT)
	@docker compose -f $(DOCKER_ROOT)/compose.dev.yml up --build
	@echo "${GREEN}✅ "


docker-stage-up:
	@echo "${YELLOW}🚀 Starting Docker in Stage Env..."
	@cd $(ROOT) 
	@touch $(ENV_LOCAL) $(ENV_ROOT) $(ENV_STAGE)
	@set -a && . $(ENV_STAGE) && . $(ENV_LOCAL) && . $(ENV_ROOT) && set +a;
	@export PROJECT_ROOT=$(ROOT)
# 	@echo "VAL: $$PROJECT_ROOT" # Print an environment variable
	@docker compose -f $(DOCKER_ROOT)/compose.stage.yml up --build
	@echo "${GREEN}✅ "


docker-multi-stage-up:
	@echo "${YELLOW}🚀 Starting Docker in Stage Env..."
	@cd $(ROOT) 
	@touch $(ENV_LOCAL) $(ENV_ROOT) $(ENV_STAGE)
	@set -a && . $(ENV_STAGE) && . $(ENV_LOCAL) && . $(ENV_ROOT) && set +a;
	@export PROJECT_ROOT=$(ROOT)
# 	@echo "VAL: $$PROJECT_ROOT" # Print an environment variable
	@docker compose -f $(DOCKER_ROOT)/compose.multi.stage.yml up --build
	@echo "${GREEN}✅ "


docker-prod-up:
	@echo "${YELLOW}🚀 Starting Docker in Prod Env..."
	@cd $(ROOT) 
	@touch $(ENV_LOCAL) $(ENV_ROOT) $(ENV_PROD)
	@set -a && . $(ENV_PROD) && . $(ENV_LOCAL) && . $(ENV_ROOT) && set +a;
	@export PROJECT_ROOT=$(ROOT)
# 	@echo "VAL: $$PROJECT_ROOT" # Print an environment variable
	@docker compose -f $(DOCKER_ROOT)/compose.prod.yml up --build
	@echo "${GREEN}✅ "



docker-multi-prod-up:
	@echo "${YELLOW}🚀 Starting Docker in Prod Env For multi Domains..."
	@cd $(ROOT) 
	@touch $(ENV_LOCAL) $(ENV_ROOT) $(ENV_PROD)
	@set -a && . $(ENV_PROD) && . $(ENV_LOCAL) && . $(ENV_ROOT) && set +a;
	@export PROJECT_ROOT=$(ROOT)
# 	@echo "VAL: $$PROJECT_ROOT" # Print an environment variable
	@docker compose -f $(DOCKER_ROOT)/compose.multi.prod.yml up --build
	@echo "${GREEN}✅ "