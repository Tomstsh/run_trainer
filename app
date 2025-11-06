
if [ $1 == "up" ]; then
    docker-compose up -d

elif [ $1 == "down" ]; then
    docker-compose down

elif [ $1 == "build" ]; then
    docker build -t pynode:1.0.0 -f Dockerfile.pynode .
    docker-compose build run_trainer

elif [ $1 == "bash" ]; then
    docker-compose exec -it run_trainer bash

elif [ $1 == "start" ]; then
    docker-compose exec run_trainer python ./src/backend/manage.py runserver 0.0.0.0:80

elif [ $1 == "build-app" ]; then
    docker-compose exec run_trainer npm run build

elif [ $1 == "start-dev" ]; then
    docker-compose exec -e DEV=True run_trainer npm run dev

elif [ $1 == "manage" ]; then
    shift
    docker compose exec run_trainer python ./src/backend/manage.py $@

elif [ $1 == "sqlite" ]; then
    sqlite3 ./src/backend/db.sqlite3

elif [ $1 ==  "pip" ]; then
    shift
    docker compose exec run_trainer pip $@

fi