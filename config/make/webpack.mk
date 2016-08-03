config/webpack.dist/%.js: config/webpack/%.js
	mkdir -p $(dir $@)
	babel $< -o $@

webpack: $(patsubst config/webpack/%.js, config/webpack.dist/%.js, $(wildcard config/webpack/*.js))

.PHONY: webpack
