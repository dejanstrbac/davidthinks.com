publish: 	clean \
					build_en \
					build_sr \
					copy_assets \
					upload \
					invalidate_caches

clean:
	rm -rf public/

copy_assets:
	cp -R static/assets public && \
	cp static/index.html static/robots.txt public/

build_en:
	hugo --config=config_en_live.toml && \
	rm -rf public/en/assets

build_sr:
	hugo --config=config_sr_live.toml && \
	rm -rf public/sr/assets

upload:
	AWS_PROFILE=davidthinks aws s3 sync public s3://davidthinks.com --delete --acl public-read --exclude "*/.DS_Store"

invalidate_caches:
	AWS_PROFILE=davidthinks aws cloudfront create-invalidation --distribution-id=E1YN7RZ3VK5CXI --paths=/* --output=text
