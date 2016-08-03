PATH := ./node_modules/.bin:$(PATH)

NODE_ENV ?= development
WEBPACK_OPTIONS := --progress --env $(NODE_ENV)

default: build

.PHONY: default

include ./config/make/*.mk
