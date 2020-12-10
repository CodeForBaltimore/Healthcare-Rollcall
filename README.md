[![Build Status](https://travis-ci.org/CodeForBaltimore/Healthcare-Rollcall.svg?branch=master)](https://travis-ci.org/CodeForBaltimore/Healthcare-Rollcall) [![Netlify Status](https://api.netlify.com/api/v1/badges/83fb49cb-61e1-4c21-8893-03e17e75d972/deploy-status)](https://app.netlify.com/sites/healthcare-rollcall/deploys) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/CodeForBaltimore/Healthcare-Rollcall.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/CodeForBaltimore/Healthcare-Rollcall/context:javascript)

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
  - [Contributors ✨](#contributors-)

<!-- /TOC -->

## What is this?

This system will provide methods for healthcare providers to check-in during disasters, and update their information during non-emergency periods. During an emergency this system will track providers responses to a questionnaire. This questionnaire can be specific to a single disaster, or can be more general. Examples:

- Widespread power blackout
- Epidemic or Pandemic response (COVID-19)
- Natural disaster

This system will make use of digital services and modern methodologies to automate parts of the check-in process to help the city prioritize its call list and response plan. Additionally, the system will validate contact information regularly during non-emergency times to ensure the city has the most up-to-date information for each provider.

## Documentation

More documentation can be found in the [Docs](/docs) folder.

# Project setup

The quickest way to get started is using the included `docker-compose` to build a complete local stack (web, api, and database) of the project.

Add the following to a file named `.env` in your project directory:

```conf
PORT=3000
VUE_APP_BASE_API_URL=http://localhost:3001
DATABASE_PASSWORD= # Custom value
JWT_KEY= # Custom value
```

- `PORT`: The port the web service will be exposed on the host machine. Default: `3000`
- `VUE_APP_BASE_API_URL`: The URL to the api service, includes hostname and port. Default: `http://localhost:3001`.
- `DATABASE_PASSWORD`: The password used to authenticate to the postgres database. For security, use a custom value.
- `JWT_KEY`: A secret value to generate JSON Web Tokens (JWTs) locally. For security, use a custom value.

You would then run the docker-compose setup with `docker-compose up -d` to run the DB & API in detached mode and then `npm run serve` to run the frontend.

## Keeping your API up to date

By default the backend solution will pull the `master` branch of [Bmore-Responsive](https://github.com/CodeForBaltimore/Bmore-Responsive). If you wish to keep this up to date you should run:

```shell
docker-compose build
```

You can also specify a tagged release by setting the `API_TAG` value in your `.env` file:

```shell
API_TAG=1.3.2
```

For more information on valid `API_TAG` values, see: [docker build - Git repositories](https://docs.docker.com/engine/reference/commandline/build/#git-repositories)

## Compiles and hot-reloads for development

Using `docker-compose` will mount your local `./src` directory into the application, which allows you to continue to make changes and view them within the application.

The application will be available at [http://localhost:3000/](http://localhost:3000/).

**User Credentials:** To find example user credentials, look to the user.json file in the [Bmore-Responsive repository](https://github.com/CodeForBaltimore/Bmore-Responsive).

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

### Using Jest for unit testing

```shell
`npm test`
`yarn test`
```

### Using Snyk to check for security vulnerabilities

```shell
`npm install snyk -g`
`snyk test`
```

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
    <td align="center"><a href="http://www.jasonanton.com"><img src="https://avatars0.githubusercontent.com/u/6391564?v=4" width="100px;" alt=""/><br /><sub><b>Jason Anton</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=revjtanton" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=revjtanton" title="Documentation">📖</a> <a href="#security-revjtanton" title="Security">🛡️</a></td>
    <td align="center"><a href="https://ao10.github.io"><img src="https://avatars3.githubusercontent.com/u/14120224?v=4" width="100px;" alt=""/><br /><sub><b>Ati Ok</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=ao10" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3Aao10" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://www.restechsys.com"><img src="https://avatars2.githubusercontent.com/u/5619637?v=4" width="100px;" alt=""/><br /><sub><b>Harry Respass</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=helro154" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3Ahelro154" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/cmavelis"><img src="https://avatars3.githubusercontent.com/u/16199008?v=4" width="100px;" alt=""/><br /><sub><b>Cameron Avelis</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=cmavelis" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3Acmavelis" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/joffutt4"><img src="https://avatars0.githubusercontent.com/u/10181869?v=4" width="100px;" alt=""/><br /><sub><b>joffutt4</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=joffutt4" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3Ajoffutt4" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/MGardner02"><img src="https://avatars0.githubusercontent.com/u/35646560?v=4" width="100px;" alt=""/><br /><sub><b>MGardner02</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=MGardner02" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/pulls?q=is%3Apr+reviewed-by%3AMGardner02" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://markadk.in/s"><img src="https://avatars0.githubusercontent.com/u/6365836?v=4" width="100px;" alt=""/><br /><sub><b>Mark Adkins</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=funkybunch" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=funkybunch" title="Documentation">📖</a> <a href="#design-funkybunch" title="Design">🎨</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/charlesw2004"><img src="https://avatars0.githubusercontent.com/u/30778546?v=4" width="100px;" alt=""/><br /><sub><b>Wilner Charles</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=charlesw2004" title="Code">💻</a></td>
    <td align="center"><a href="http://jasonbixon.netlify.com"><img src="https://avatars3.githubusercontent.com/u/32110237?v=4" width="100px;" alt=""/><br /><sub><b>Jason Bixon</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=jbixon13" title="Code">💻</a> <a href="#design-jbixon13" title="Design">🎨</a> <a href="#infra-jbixon13" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://snyk.io"><img src="https://avatars2.githubusercontent.com/u/19733683?v=4" width="100px;" alt=""/><br /><sub><b>Snyk bot</b></sub></a><br /><a href="#security-snyk-bot" title="Security">🛡️</a></td>
    <td align="center"><a href="https://dependabot.com"><img src="https://avatars1.githubusercontent.com/u/27347476?v=4" width="100px;" alt=""/><br /><sub><b>Dependabot</b></sub></a><br /><a href="#security-dependabot[bot]" title="Security">🛡️</a></td>
    <td align="center"><a href="http://stephanie.marketing"><img src="https://avatars2.githubusercontent.com/u/47190328?v=4" width="100px;" alt=""/><br /><sub><b>Stephanie</b></sub></a><br /><a href="#content-uxstephanie" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/c-w-allen"><img src="https://avatars0.githubusercontent.com/u/64177457?v=4" width="100px;" alt=""/><br /><sub><b>c-w-allen</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=c-w-allen" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/blakenan-bellese"><img src="https://avatars1.githubusercontent.com/u/61432973?v=4" width="100px;" alt=""/><br /><sub><b>blakenan-bellese</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=blakenan-bellese" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://ianjadams.com"><img src="https://avatars1.githubusercontent.com/u/7966226?v=4" width="100px;" alt=""/><br /><sub><b>Ian Adams</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=ijadams" title="Code">💻</a></td>
    <td align="center"><a href="https://www.joshglazer.com"><img src="https://avatars1.githubusercontent.com/u/5789311?v=4" width="100px;" alt=""/><br /><sub><b>Josh Glazer</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/Healthcare-Rollcall/commits?author=joshglazer" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
