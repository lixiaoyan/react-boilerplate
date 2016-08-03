PATH := ./node_modules/.bin:$(PATH)

WEBPACK_OPTIONS := --progress

default: build

.PHONY: default

include ./config/make/*.mk
