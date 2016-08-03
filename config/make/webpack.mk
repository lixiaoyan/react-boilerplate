config/webpack.dist:
	mkdir -p $@

config/webpack.dist/%.js: config/webpack/%.js config/webpack.dist config/.babelrc
	babel $< -o $@
