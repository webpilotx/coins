# Template Project

This is a template project using Express.js and Vite.

## Features

- Serves static files from the `dist` directory.
- Configurable via environment variables.
- Includes a basic Express.js server.

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd template
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```
   PORT=3000
   ```

## Development

To start the development server:

```bash
pnpm dev
```

## Build

To build the project for production:

```bash
pnpm build
```

## Production

To start the production server:

```bash
pnpm start
```

Ensure the `dist` directory is built before starting the server.

## License

This project is licensed under the MIT License.
