# Portfolio Website

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

## Building

To build the project:

```bash
npm run build
```

This will create a production build in the `project/dist` directory.