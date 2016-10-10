lint-config:
	$(ESLINT) ./config

lint-scripts:
	$(ESLINT) --ext .js --ext .jsx ./src

lint-styles:
	$(SASS_LINT) "./src/**/*.s+(a|c)ss"

lint: lint-config lint-scripts lint-styles

.PHONY: lint-config lint-scripts lint-styles lint
