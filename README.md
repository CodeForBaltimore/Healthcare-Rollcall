[![Build Status](https://travis-ci.org/CodeForBaltimore/Healthcare-Rollcall.svg?branch=master)](https://travis-ci.org/CodeForBaltimore/Healthcare-Rollcall)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Healthcare Rollcall

In the event of a disaster, Baltimore City and the Baltimore City Health Department (BCHD) needs to be able to verify the status of all healthcare providers in the city. 

<!-- TOC -->

- [Healthcare Rollcall](#healthcare-rollcall)
    - [What is this?](#what-is-this)
    - [Documentation](#documentation)
- [Project setup](#project-setup)
    - [Docker and docker-compose](#docker-and-docker-compose)
        - [Full .env example](#full-env-example)
        - [Keeping your API up to date](#keeping-your-api-up-to-date)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Customize configuration](#customize-configuration)
- [Using this product](#using-this-product)
    - [Testing](#testing)
- [Sources and Links](#sources-and-links)

<!-- /TOC -->

## What is this?
This system will provide methods for healthcare providers to check-in during disasters, and update their information during non-emergency periods. During an emergency this system will track providers responses to a questionnaire.  This questionnaire can be specific to a single disaster, or can be more general.  Examples:

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
Where <your API url> would be http://localhost:3000 if you're running the backend locally, by default PORT is 3000.

## Docker and docker-compose
To use the backend of this project in an easy way, a `docker-compose` file has been included for convenience. To run this you must add a few entries to your `.env` file.
```shell
DATABASE_URL=postgres://user:pass@example.com:5432/dbname
DATABASE_USER=<your username>
DATABASE_PASSWORD=<your password>
DATABASE_SCHEMA=<your schema>
```
The `DATABASE_URL` is not a very clear var name, and the string is broken down as `postgres://username:password@host:port/database_name`

An example of the `DATABASE_URL` would be `DATABASE_URL=postgres://user:pass@db:5432/dbname`

You would then run the docker-compose setup with `docker-compose up -d` to run the DB & API in detached mode and then `npm run serve` to run the frontend.

### Full .env example
Here is a full example of default values for our `.env` file. You should be able to copy/paste this directly and it will work locally, however we ***STRONGLY*** encourage you to use custom values.
```
VUE_APP_BASE_API_URL=http://localhost:3000
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@db:5432/postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_SCHEMA=public
JWT_KEY=abc123
BYPASS_LOGIN=true
```

### Keeping your API up to date
By default the backend solution will pull the latest image from Dockerhub. If you wish to keep this up to date you should run:
```
docker pull codeforbaltimore/bmore-responsive
```
You can also specify a tagged release:
```
docker pull codeforbaltimore/bmore-responsive:1.0.2
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

<p align="center">
    <img src="docs/img/CfB.png" width="400">
</p>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.jasonanton.com"><img src="https://avatars0.githubusercontent.com/u/6391564?v=4" width="100px;" alt=""/><br /><sub><b>Jason Anton</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=revjtanton" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=revjtanton" title="Documentation">📖</a> <a href="#eventOrganizing-revjtanton" title="Event Organizing">📋</a> <a href="#ideas-revjtanton" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-revjtanton" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-revjtanton" title="Maintenance">🚧</a> <a href="#projectManagement-revjtanton" title="Project Management">📆</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3Arevjtanton" title="Reviewed Pull Requests">👀</a> <a href="#security-revjtanton" title="Security">🛡️</a></td>
    <td align="center"><a href="https://ao10.github.io"><img src="https://avatars3.githubusercontent.com/u/14120224?v=4" width="100px;" alt=""/><br /><sub><b>Ati Ok</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=ao10" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3Aao10" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://www.restechsys.com"><img src="https://avatars2.githubusercontent.com/u/5619637?v=4" width="100px;" alt=""/><br /><sub><b>Harry Respass</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=helro154" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3Ahelro154" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/cmavelis"><img src="https://avatars3.githubusercontent.com/u/16199008?v=4" width="100px;" alt=""/><br /><sub><b>Cameron Avelis</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=cmavelis" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3Acmavelis" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/joffutt4"><img src="https://avatars0.githubusercontent.com/u/10181869?v=4" width="100px;" alt=""/><br /><sub><b>joffutt4</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=joffutt4" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3Ajoffutt4" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/joffutt-bellese"><img src="https://avatars2.githubusercontent.com/u/61434152?v=4" width="100px;" alt=""/><br /><sub><b>joffutt-bellese</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=joffutt-bellese" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3Ajoffutt-bellese" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/MGardner02"><img src="https://avatars0.githubusercontent.com/u/35646560?v=4" width="100px;" alt=""/><br /><sub><b>MGardner02</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=MGardner02" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3AMGardner02" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!