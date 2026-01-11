# Portfolio Website

## Judges Quickstart
- Setup: Works on Windows and Mac; requires Node 18+.
- Run: `npm run dev` launches the app at `http://localhost:5173` (or next available port).
- Demo: Use the top navigation to visit `About`, `Skills`, `Projects`, `Certificates`, `Timeline`, and `Contact`. Try dark mode toggle and submit the contact form with test data.

## Project Structure

This repository contains a portfolio website with the following structure:

- `/project` - Contains the main project files including source code, configuration, and build scripts
- Root directory - Contains configuration files for deployment

## Deployment

This project is configured for deployment on Netlify. The deployment is set up with the following files:

- `netlify.toml` - Configuration file for Netlify deployment
- `package.json` - Contains scripts to run commands in the project directory

### Netlify Deployment

The project is configured to be deployed on Netlify with the following settings:

- Build command: `npm run build`
- Publish directory: `project/dist`

For more detailed information about the deployment process, please refer to the [NETLIFY_DEPLOYMENT.md](project/NETLIFY_DEPLOYMENT.md) file in the project directory.

## Development

To run the project locally:

```bash
npm run dev
```

This will start the development server in the project directory.

## Demo Instructions (for Judges)
- Navigate through the pages using the header. Active route is highlighted.
- Toggle theme using the sun/moon button in the header.
- Use the skip link (`Tab` once) to jump to main content for accessibility.
- On mobile-sized viewports, open the hamburger menu, then navigate to pages.
- On `Contact`, fill sample data and click `Send` to see form validation and submission flow.

## Building

To build the project:

```bash
npm run build
```

This will create a production build in the `project/dist` directory.

## Testing
- Unit tests: `cd project; npm run test:unit`
- E2E tests (Playwright): `cd project; npm run test:e2e`
- Coverage: `cd project; npm run coverage`

## Routes
- Implemented with `react-router-dom` under a shared layout:
  - `/` Home
  - `/about` About
  - `/skills` Skills
  - `/projects` Projects
  - `/certificates` Certificates
  - `/timeline` Timeline
  - `/contact` Contact