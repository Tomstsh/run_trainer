
if [ $1 == "up" ]; then
    docker-compose up -d

elif [ $1 == "down" ]; then
    docker-compose down

elif [ $1 == "build" ]; then
    docker-compose build run_trainer

elif [ $1 == "bash" ]; then
    docker-compose exec -it run_trainer bash

elif [ $1 == "start" ]; then
    docker-compose exec -it run_trainer python ./src/manage.py runserver 0.0.0.0:80

elif [ $1 == "manage" ]; then
    shift
    docker compose exec -it run_trainer python ./src/manage.py $@

elif [ $1 == "sqlite" ]; then
    sqlite3 ./src/db.sqlite3

fi