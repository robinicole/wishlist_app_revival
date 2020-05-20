run_backend:
	cd backend/wishlist/ && pipenv run python manage.py runserver &

run_frontend: run_backend
	cd frontend && npm start

build_backend:
	cd backend && docker build -f Dockerfile.backend -t wishlist/backend .
build_frontend:
	cd frontend && docker build -f Dockerfile.frontend -t wishlist/frontend .


