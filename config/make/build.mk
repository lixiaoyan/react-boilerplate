build: config/webpack.dist/app.js vendor
	webpack $(WEBPACK_OPTIONS) --config ./config/webpack.dist/app.js

serve: config/webpack.dist/app.js vendor
	webpack-dev-server $(WEBPACK_OPTIONS) --config ./config/webpack.dist/app.js

dist/vendor: config/webpack.dist/vendor.js package.json
	webpack $(WEBPACK_OPTIONS) --config ./config/webpack.dist/vendor.js

vendor: dist/vendor

deploy:
	$(MAKE) ENV=production build

.PHONY: build serve vendor deploy
