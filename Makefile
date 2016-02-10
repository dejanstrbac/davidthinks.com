publish:
	rm -rf public && \
	hugo && \
	AWS_PROFILE=davidthinks aws s3 sync public s3://davidthinks.com --delete --acl public-read && \
	AWS_PROFILE=davidthinks aws cloudfront create-invalidation --distribution-id=E2Z3PJ2LACDC3F --paths=/*
