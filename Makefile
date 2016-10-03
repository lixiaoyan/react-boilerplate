BIN := ./node_modules/.bin

BABEL_NODE := $(BIN)/babel-node
WEBPACK := $(BABEL_NODE) $(BIN)/webpack
WEBPACK_DEV_SERVER := $(BABEL_NODE) $(BIN)/webpack-dev-server
ESLINT := $(BIN)/eslint

default: build

.PHONY: default

include ./config/make/*.mk
