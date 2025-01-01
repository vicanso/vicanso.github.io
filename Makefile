
pingap:
	rm -rf pingap-zh \
	&& cd pingap-zh-src \
	&& yarn build \
	&& cp -rf build ../pingap-zh \
	&& cd .. \
	&& rm -rf pingap-en \
	&& cd pingap-en-src \
	&& yarn build \
	&& cp -rf build ../pingap-en
