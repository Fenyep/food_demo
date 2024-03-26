# Food_demo

**An evolutive NestJs based project to implement innovative techniques of code development.**

## Prerequesites ?

- **NodeJs** : If you don't have NodeJs installed, you will have to [download](https://nodejs.org/en 'node js official site') and install it on your OS. Prefer the long time support version (LTS)
- **NestJs cli** : Follow this installation [link](https://docs.nestjs.com/ 'install nestjs') to achieve that.
- **Docker and Docker compose** : if not installed, [download](https://docs.docker.com/get-docker/ 'link to dowload docker') and install them on your OS.

## How to launch the project ?

### \* Launch the database service

Open a terminal and execute the following command

`sudo docker compose up -d`

This will download and launch the postgres database instance

### \* Install the dependencies

The project is _Package manager agnostic_. Meaning that depending on which package manager you are using, you can use the corresponding command to install the dependencies. Here i will use _yarn._

`yarn install`

### \* Start the application

This command will launch the NestJs app

`yarn start:dev`
