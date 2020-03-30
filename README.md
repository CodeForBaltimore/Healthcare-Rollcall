[![Build Status](https://travis-ci.org/CodeForBaltimore/Healthcare-Rollcall.svg?branch=master)](https://travis-ci.org/CodeForBaltimore/Healthcare-Rollcall)

<!-- TOC -->

- [Healthcare Rollcall](#healthcare-rollcall)
    - [Documentation](#documentation)
- [Project setup](#project-setup)
    - [Docker and docker-compose](#docker-and-docker-compose)
        - [Full .env example](#full-env-example)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Customize configuration](#customize-configuration)
- [Using this product](#using-this-product)
    - [Testing](#testing)
- [Sources and Links](#sources-and-links)

<!-- /TOC -->

# Healthcare Rollcall

In the event of a disaster, Baltimore City and the Baltimore City Health Department (BCHD) is required to verify the electrical power status of all healthcare providers in the city. This system will provide methods for healthcare providers to check-in during disasters, and update their information during non-emergency periods. During an emergency this system will track providers responses to a questionnaire.  This questionnaire can be specific to a single disaster, or can be more general.  Examples:

* Widespread power blackout
* Epidemic or Pandemic response (COVID-19)
* Natural disaster

This system will make use of digital services and modern methodologies to automate parts of the check-in process to help the city prioritize its call list and response plan. Additionally, the system will validate contact information regularly during non-emergency times to ensure the city has the most up-to-date information for each provider.

## Documentation

We've included a `docs` folder with a template [Tech Spec](/docs/Tech_Spec.md) and [Best Practices](/docs/Best_Practices.md) document, though using Github's Wiki capabilities is also a good idea. This will get you started with documenting your project.  Other documents and relevant information that has no other place can live in the `docs` folder.  Replace this paragraph with a brief breakdown of what you've included in your `docs` folder.

# Project setup

```shell
npm install
```

Add the following to a file named `.env` in your project directory:
```shell
VUE_APP_BASE_API_URL=<your API url>
```
Where <your API url> would be http://localhost:PORT if you're running the backend locally, by default PORT is 3000.

## Docker and docker-compose
To use the backend of this project in an easy way, a `docker-compose` file has been included for convenience. To run this you must add a few entries to your `.env` file.
```shell
DATABASE_URL=postgres://user:pass@example.com:5432/dbname
DATABASE_USER=<your username>
DATABASE_PASSWORD=<your password>
```
The `DATABASE_URL` is not a very clear var name, and the string is broken down as `postgres://username:password@host:port/database_name`

An example of the `DATABASE_URL` would be `DATABASE_URL=postgres://user:pass@db:5432/dbname`

You would then run the docker-compose setup with `docker-compose up -d` to run the Db & API in detached mode and then `npm run serve` to run the frontend.

### Full .env example
Here is a full example of default values for our `.env` file. You should be able to copy/paste this directly and it will work locally, however we ***STRONGLY*** encourage you to use custom values.
```
VUE_APP_BASE_API_URL=http://localhost:3000
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@db:5432/postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
JWT_KEY=abc123
BYPASS_LOGIN=true
```

## Compiles and hot-reloads for development

```shell
npm run serve
```

The application will be available at http://localhost:8080/

**Note:** Depending on the OS you are running `Docker` on your localhost may be mapped to a different IP address. The standard IP address `Docker` is mapped to on Windows is `192.168.99.100` so you would access the application at `192.168.99.100:8080`.  

## Compiles and minifies for production

```shell
npm run build
```

## Lints and fixes files

```shell
npm run lint
```

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Using this product

How would someone use this product? Give a few examples here.

## Testing

What does someone need to do to test their work? Have you included a specific testing framework or guideline (hint: you should)? Any information about testing should be added here.

# Sources and Links

We are also building a back-end API to feed and manage data for this project. To view that project, or to contribute to it, please visit the repo here: https://github.com/CodeForBaltimore/Bmore-Responsive

We will be including multi-repo build processes with the back-end that will reference this project.

<p align="center">
    <img src="docs/img/CfB.png" width="400">
</p>
