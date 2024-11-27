# Nuxt Tabs Only Slots

```md
::tab-group
  :::tab-item
  #header
  First Tab

  #default
  This is the content for my first tab
  :::

  :::tab-item
  ---
  active: true
  header: "My tab title"
  ---
  The second tab is initially active and uses the header prop.
  :::
::
```

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
