all:
	find ./build -name "*.iconset" -exec iconutil -c icns {} \; && rm -rf ./build/*.iconset
clean:
	rm -rf ./build
