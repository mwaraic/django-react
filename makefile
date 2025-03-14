.PHONY: start

start:
	cd react && docker-compose up -d
	cd django && docker-compose up -d
	cd django && docker-compose exec python bash -c " \
		python manage.py makemigrations && \
		python manage.py migrate "
