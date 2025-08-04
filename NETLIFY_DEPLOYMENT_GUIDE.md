# Netlify Deployment Guide

## Recent Deployment Issues Fixed

### Issue 1: ESLint Warning

Fixed the ESLint warning in `Contact.tsx` by removing the unused variable in the catch block:

```typescript
// Changed from:
catch (_err) {
  console.error('Failed to copy email');
}

// To:
catch {
  console.error('Failed to copy email');
}
```

### Issue 2: Missing Dependencies

Updated the root `package.json` to install dependencies before building:

```json
"scripts": {
  "build": "cd project && npm install && npm run build",
  "dev": "cd project && npm install && npm run dev",
  // other scripts similarly updated
}
```

### Issue 3: Cloudinary Plugin Error

The build was failing because the Netlify UI had the Cloudinary plugin enabled, but no Cloudinary Cloud Name was configured.

**Solution:**

1. Updated `netlify.toml` to exclude the Cloudinary plugin:
   ```toml
   [plugins.inputs]
     exclude = ["netlify-plugin-cloudinary"]
   ```

2. **Important:** You should also disable the Cloudinary plugin in the Netlify UI:
   - Go to your site's dashboard on Netlify
   - Navigate to Site settings > Build & deploy > Build plugins
   - Remove the Cloudinary plugin or configure it with your Cloudinary Cloud Name

## Deployment Configuration

Your project is set up with the following deployment configuration:

1. **Root Directory Structure:**
   - `/project` - Contains the main project files
   - Root directory - Contains configuration files for deployment

2. **Netlify Configuration:**
   - Build command: `npm run build` (which runs `cd project && npm install && npm run build`)
   - Publish directory: `project/dist`
   - Node version: 18

## Troubleshooting

If you encounter any deployment issues:

1. Check the build logs for specific error messages
2. Ensure all required environment variables are set in Netlify
3. Verify that the plugins configured in the UI match those in `netlify.toml`

For more detailed information, refer to the [NETLIFY_DEPLOYMENT.md](project/NETLIFY_DEPLOYMENT.md) file in the project directory.