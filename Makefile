PATH := ./node_modules/.bin:$(PATH)

ENV := development
WEBPACK_OPTIONS := --progress --env $(ENV)

default: build

.PHONY: default

include ./config/make/*.mk
