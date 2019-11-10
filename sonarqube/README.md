# SonarQube
For convenience a `docker-compose.yaml` file is included in this repository which will standup a SonarQube and PostgreSQL container to use in code scanning.  To use this service it is assumed you have Docker installed and configured on your local system, and you will need to set the following environment variables:

```sh
export SONAR_POSTGRES_USER=<your username>
export SONAR_POSTGRES_PASSWORD=<your password>
```

Once that's set you can run the service:
```sh
docker-compose up -d
```

SonarQube will be running at http://localhost:9000

You will need `sonar-scanner` running locally. To do that follow the directions here: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/

Once your local SonarQube instance is running and `sonar-scanner` is installed you can analyze this project from the project root by simply running:
```sh
sonar-scanner
```

## Reference
For more information visit the [Docker Hub](https://hub.docker.com/_/sonarqube) project page.
