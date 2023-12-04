APP_NAME = bili-danmu

buildapp:
	sh release.sh

push:
	git add .
	git commit -m "c"
	git push