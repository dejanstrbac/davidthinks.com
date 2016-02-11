publish: 	clean \
					build_en \
					build_sr \
					copy_assets \
					upload \
					invalidate_caches

clean:
	rm -rf public/assets

copy_assets:
	cp -R static/assets public && \
	cp static/redirect.html public/index.html
	cp static/robots.txt public/

build_en:
	hugo --config=config_en_live.toml

build_sr:
	hugo --config=config_sr_live.toml

upload:
	find public/ -name '.DS_Store' -type f -delete && \
	find public/ -name '.html' -type f -delete && \
	AWS_PROFILE=davidthinks aws s3 sync public s3://davidthinks.com --delete --acl public-read --exclude "*/.DS_Store"

invalidate_caches:
	AWS_PROFILE=davidthinks aws cloudfront create-invalidation --distribution-id=E1YN7RZ3VK5CXI --paths=/* --output=text
