# Quick Start

This brief guide will get you up and running your own copy of Healthcare-Rollcall locally. The approach below is just one way to get Healthcare-Rollcall running. For other approaches and more detail on configuration, please see the [Slow Start Guide](/SlowStart) section of the Users' Guide.

## Step 1 - Download code from github

We're assuming that you've cloned or downloaded the contents of the [Healthcare-Rollcall repository on GitHub](https://github.com/CodeForBaltimore/Healthcare-Rollcall).

## Step 2 - Install Required Software

In order to follow this quick start guide you'll need to make sure you have the following software installed on your machine:

- **Docker Desktop with DockerHub access** - Docker is not technically required to run BMore Responsive, but this guide uses Docker to get up and running quickly. You can confirm that you have Docker Desktop by executing `docker -v` at a command line. If your machine replies with a version number like `Docker version 19.03.8, build afaca4b` then you have Docker Desktop installed. If you need to install Docker Desktop, head on over to the [Docker Desktop page](https://www.docker.com/products/docker-desktop).

**If you are on a Windows 10 Home machine:**  
While Windows 10 Pro, Education, and Enterprise allow easy installation and usage of Docker, Windows 10 Home requires an alternate installation method. Reference Docker's docs for [ Windows 10 Home Installation](https://docs.docker.com/docker-for-windows/install-windows-home/).

Additional notes regarding Windows 10 Home and Docker can be found in the [Users Guide](HowToUse.md).

## Step 3 - Configure Your Environment

Create a file in the root directory of your project called `.env` and add the following to it:

```conf
PORT=3000
VUE_APP_BASE_API_URL=http://localhost:3001
DATABASE_PASSWORD= # Custom value
JWT_KEY= # Custom value
```

- `PORT`: The port the web service will be exposed on the host machine. Default: 3000
- `VUE_APP_BASE_API_URL`: The URL to the api service, includes hostname and port. Default: http://localhost:3001.
- `DATABASE_PASSWORD`: The password used to authenticate to the postgres database. For security, use a custom value.
- `JWT_KEY`: A secret value to generate JSON Web Tokens (JWTs) locally. For security, use a custom value.

## Step 4 - Run Development Stack

To run the application run `docker-compose up -d --build`.

## Step 5 - Confirm Success

To confirm the application is running, just point your browser to [http://localhost:3000](http://localhost:3000). You should see the login screen.

**Congratulations!** Why not check out the ["How to Use"](HowToUse.md) guide and learn more by using Bmore Responsive. When done, you can shut everything down with `docker-compose down`.