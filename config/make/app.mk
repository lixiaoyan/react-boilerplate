build: webpack
	webpack $(WEBPACK_OPTIONS) --config ./config/webpack.dist/app.js

serve: webpack
	webpack-dev-server $(WEBPACK_OPTIONS) --config ./config/webpack.dist/app.js

.PHONY: build serve
