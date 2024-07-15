
pingap:
	rm -rf pingap \
	&& cd pingap-zh-src \
	&& yarn build \
	&& cp -rf build ../pingap-zh
