# Lite AEM Compactor
Lite Node.js Application which triggers Local Adobe Experience Manager Offline Compaction

# Prerequisites
To enable the communication from docker container to service outside of docker compose you will need to have `host.docker.internal` hostname mapped on your local machine.

`127.0.0.1 host.docker.internal`

# How to use it

1. Build Docker compose 

`docker compose -f docker-compose.yml build`

2. Start docker compose 

`docker compose -f docker-compose.yml up -d`

3. Turn off 

`docker compose -f docker-compose.yml down`