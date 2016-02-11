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
	hugo --config=config_en.toml --baseURL="https://davidthinks.com/en" && \
	rm -rf public/en/assets

build_sr:
	hugo --config=config_sr.toml --baseURL="https://davidthinks.com/sr" && \
	rm -rf public/sr/assets

upload:
	AWS_PROFILE=davidthinks aws s3 sync public s3://davidthinks.com --delete --acl public-read --exclude "*/.DS_Store" --debug

invalidate_caches:
	AWS_PROFILE=davidthinks aws cloudfront create-invalidation --distribution-id=E1YN7RZ3VK5CXI --paths=/* --output=text --debug
