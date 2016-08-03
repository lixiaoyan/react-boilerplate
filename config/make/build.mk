build: config/webpack.dist/app.js vendor
	webpack $(WEBPACK_OPTIONS) --config ./config/webpack.dist/app.js

serve: config/webpack.dist/app.js vendor
	webpack-dev-server $(WEBPACK_OPTIONS) --config ./config/webpack.dist/app.js

dist/vendor: config/webpack.dist/vendor.js package.json
	webpack $(WEBPACK_OPTIONS) --config ./config/webpack.dist/vendor.js

vendor: dist/vendor

deploy: config/webpack.dist/app.js
	webpack $(WEBPACK_OPTIONS) --env.production --config ./config/webpack.dist/app.js

.PHONY: build serve vendor deploy
