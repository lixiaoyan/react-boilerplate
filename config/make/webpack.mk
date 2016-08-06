config/webpack.dist/%.js: config/webpack/%.js config/.babelrc
	mkdir -p $(dir $@)
	babel $< -o $@
