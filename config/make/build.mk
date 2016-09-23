build: vendor
	$(WEBPACK) --config ./config/webpack/app.js

serve: vendor
	$(WEBPACK_DEV_SERVER) --config ./config/webpack/app.js

dist/vendor/vendor.js: package.json
	$(WEBPACK) --config ./config/webpack/vendor.js

vendor: dist/vendor/vendor.js

deploy:
	$(WEBPACK) --env.production --config ./config/webpack/app.js

.PHONY: build serve vendor deploy
