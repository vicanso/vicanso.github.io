
pingap:
	rm -rf pingap-zh \
	&& cd pingap-zh-src \
	&& yarn build \
	&& cp -rf build ../pingap-zh
