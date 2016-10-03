lint-scripts:
	$(ESLINT) --ext *.js --ext *.jsx ./src

lint-styles:
	$(SASS_LINT) "./src/**/*.s+(a|c)ss"

lint: lint-scripts lint-styles

.PHONY: lint
