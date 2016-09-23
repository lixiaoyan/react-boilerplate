BIN := ./node_modules/.bin

WEBPACK := $(BIN)/babel-node $(BIN)/webpack
WEBPACK_DEV_SERVER := $(BIN)/babel-node $(BIN)/webpack-dev-server
WEBPACK_OPTIONS := --progress

default: build

.PHONY: default

include ./config/make/*.mk
