build: vendor
	$(WEBPACK) --config ./config/webpack/app.js

serve: vendor
	$(WEBPACK_DEV_SERVER) --env.hot --config ./config/webpack/app.js

dist/vendor/vendor.js: config/webpack/vendor.js package.json vendor.config.json
	$(WEBPACK) --config ./config/webpack/vendor.js

vendor: dist/vendor/vendor.js

deploy:
	$(WEBPACK) --env.production --config ./config/webpack/app.js

.PHONY: build serve vendor deploy
