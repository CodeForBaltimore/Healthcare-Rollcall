# API Spec

<TODO: Review and determine whether the content is appropriate for this section, if content should be moved elsewhere in the wiki, or whether it is context appropriate for HCRC>

The [Bmore-Responsive API](https://codeforbaltimore.github.io/Bmore-Responsive/) is documented via a OAS 3.0 API specification in the file `swagger.json`. This API spec lists all the endpoints, supported REST actions, and the request and response data formats. While you can open the `swagger.json` file in any text editor, there are better ways to view it in a richer format, such as:

- View the [API Spec on Swaggerhub](https://app.swaggerhub.com/apis/codeforbaltimore/bmoreResponsive)
- If you are running Healthcare-Rollcall with `docker-compose up -d --build`, then you can just point your browser at the root URL of your server, often `http://localhost:3001/`, you'll be redirected to `http://localhost:3001/api-docs/`

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

## Windows 10 Home hot-reloads

Due to how the installation and setup for Docker works on a Windows 10 Home machine, there are a couple quirks while running a Docker container through the WSL2 subsystem.

The main issue is that hot-reloading doesn't work out-of-the-box. Docker's `inotify` propogation will not trigger a reload for files edited on the host side (Windows 10) while the container is running in the WSL2 subsystem.

The work around is to configure `environment` for **web** in the `docker-compose.yaml`.

```yaml
version: "3"
services:
  web:
    ...
    environment:
      - ${PORT:-3000}
      - CHOKIDAR_USEPOLLING=true
      - CHOKIDAR_INTERVAL=1000
```
`CHOKIDAR_USEPOLLING=true` reconfigures how webpack watches the file system and will enable hot-reloading, but **this is notably less performant and can be CPU intensive**.  
Adding `CHOKIDAR_INTERVAL=1000` sets
a 1 second interval for webpack to check for changes, allowing consistent reloads while increasing the performance of this method drastically.

**Also be sure to remove these additional enironment settings before pushing a branch or merging a PR. This only pertains to Windows 10 Home and should not be part of the default `docker-compose` configuration.**

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

<!-- # Using this product

How would someone use this product? Give a few examples here. -->

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

We are also building a back-end API to feed and manage data for this project. To view that project, or to contribute to it, please visit the repo here: [https://github.com/CodeForBaltimore/Bmore-Responsive](https://github.com/CodeForBaltimore/Bmore-Responsive)
<p align="center">
  <img src="docs/img/CfB.png" width="400">
</p>