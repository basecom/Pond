# Pond

Look at the [Pond documentation](https://basecom.github.io/Pond) to learn more.

## Setup
Make sure you have `bun` installed:

```bash
brew install oven-sh/bun/bun
```

Make sure to install the dependencies:

```bash
bun install
```

## Local Development

- Run `cp .env.example .env` to duplicate the .env
    - `NUXT_PUBLIC_POND_SHOPWARE_ENDPOINT` can be any running shopware 6.6 backend
    - `NUXT_PUBLIC_POND_ACCESS_TOKEN` references the sales channel access token (Admin -> select sales channel -> "API-Zugang")

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Production

Build the application for production:

```bash
bun run build
```

Locally preview production build:

```bash
bun run preview
```

## Linting
```bash
bun run lint
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
