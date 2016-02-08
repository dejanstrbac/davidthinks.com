publish:
	rm -rf public && \
	hugo --theme=hyde && \
	AWS_PROFILE=davidthinks aws s3 sync public s3://davidthinks.com --delete --acl public-read
