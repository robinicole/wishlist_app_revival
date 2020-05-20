build:
	docker-compose build

run: build
	docker-compose up

local_backend:
	cd backend/wishlist && pipenv run python manage.py runserver 