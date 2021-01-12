# Slow Start

<TODO: Review and determine whether content is context appropriate for HCRC>

If you want to tweak the installation of Healthcare-Rollcall or have a different environment, then this page will provide additional detail on how to install/configure Healthcare-Rollcall.

## Configuring via Environment variables

Regardless of where you are running the system, environment variables are required to run this application. These variables are set in the `.env` file on the root directory of Healthcare-Rollcall.

## Deploying to AWS

If you want to deploy to AWS, we have included a `terraform` option. For more information on how to use this feature, please see the README in `/terraform`.

<TODO: Consider migrating terraform docs to be here or do some sort of INCLUDE to reuse the content>

## Running in Docker

You can build and run the application in Docker locally by running the following commands:

```shell
docker-compose up -d
```

### docker-compose

To use the `docker-compose.yml` file included you will first need to set [environment variables](#environment-variables). It is not recommended to use `docker-compose` for any reason other than to test a solution for a separate front-end component.