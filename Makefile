
GITHUB_IO_PATH=~/github/robinicole.github.io/wishlist_app
build:
	docker-compose build

run: build
	docker-compose up

local_backend:
	cd backend/wishlist && pipenv run python manage.py runserver 

send_to_github_io:
	cd frontend && npm run build 
	cp -rf frontend/build/* $(GITHUB_IO_PATH)
	cd $(GITHUB_IO_PATH) && git add --all && git commit -m 'update-react-app'

push_to_github_io:
	cd $(GITHUB_IO_PATH) && git push

send_and_push_to_gihhub_io: send_to_github_io push_to_github_io
