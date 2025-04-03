# Demo System

The pond demo system is available at: [https://pond-demo.fly.dev](https://pond-demo.fly.dev). It is managed via fly.io and automatically
deployed using Github Actions.

## Deployment
The deployment automatically runs whenever a change to the main branch is merged. The deployment can be found in the `.github/workflows/deploy-demo.yml` file.
It uses the nuxt-buildin `bun run build` command to generate a production-ready version of Pond which is then delivered through
a docker container. Fly.io automatically handles certificate management and https-redirection, aswell as managing the environment variables required 
for the application to run.

:::info
If your change requires new environment variables or changes to the demo instance, please contact the [Core Team](/contribute/core-team).
:::

## Docker
Fly.io is based on docker containers. The pond demo instance runs in a simple container, which can be found in the `Dockerfile` on the top-level
of Pond. The dockerfile itself installs bun and all package.json dependencies and finally runs the build command. It exposes the default port
3000. This file is not meant to run in production standalone, since it is missing crucial security measurements, like HTTPs certificates. In
our case, fly.io automatically handles this for us, - so no need to have it in our own Dockerfile.

## Autoscaling
To save costs, the demo instance is automatically scaled down to zero instances after a certain amount of inactivity and can scale up to max 2
machines at once. 

## Backend
In addition to the frontend, the backend is seperated from the frontend. For the backend, a shopware instance with the 
[Pond Companion](https://github.com/basecom/pondcompanion) plugin is deployed to Platform.sh. The configurations can be
found on the Pond Companion repository within the `.platform` directory. It has no auto-scaling or any other advanced features
enabled, since the demo system is only meant to be used for testing purposes and doesn't expect many changes.

:::info
If your change requires changes to the backend or new pages / configuration, please consider creating a Fixture in the companion plugin
or contact the [Core Team](/contribute/core-team).
:::
