# run_trainer

A small project to train in using the GPT API and a message broker (RabbitMQ probably) 

Containerized dev environment where the back and front end are in the same container. 
I realise a better solution would probably be to have the back and front ends run from seperate containers,
but I'd done it that way before so I wanted to see what I could learn from developing this way instead.

## ./src/frontend
Directory containing the React used for the frontend. Static files built with vite and hotloaded vite dev server run at `localhost:3000`. If `DEV` env variable is not set then Django serves these static files (located `~/src/frontend/dist`).

## ./src/backend
Backend Django API built using Django Rest Framework.


ADD ability for devs to add packages without having to bash in