build: webpack
	webpack $(WEBPACK_OPTIONS) --config ./config/webpack.dist/app.js

server: webpack
	webpack-dev-server $(WEBPACK_OPTIONS) --config ./config/webpack.dist/app.js

.PHONY: build server
