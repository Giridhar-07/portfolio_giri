# Portfolio Website

## Features

- Responsive design using Tailwind CSS
- Animated UI components with Framer Motion
- Contact form with EmailJS integration
- Project showcase section
- Skills and experience display

## Contact Form Setup

The contact form uses EmailJS to send emails directly from the frontend. Follow these steps to set it up:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an Email Service (e.g., Gmail, Outlook, etc.)
3. Create an Email Template with the following variables:
   - `from_name` - Sender's name
   - `from_email` - Sender's email
   - `subject` - Email subject
   - `message` - Email message
   - `to_email` - Recipient email (giridharmalagi7@gmail.com)
4. Update the `.env` file with your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_USER_ID=your_user_id
   ```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment to Netlify

This project is configured for easy deployment to Netlify. You can deploy it in several ways:

### Option 1: Using the Deployment Helper

```bash
# Run the deployment helper script
npm run deploy
```

This script will:
1. Check your environment variables
2. Verify your Netlify configuration
3. Build the project
4. Provide deployment instructions

### Option 2: Using Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize your site (first time only)
netlify init

# Deploy to production
npm run netlify
```

### Option 3: GitHub Integration

1. Push your code to GitHub
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Select your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Environment Variables

Don't forget to add your EmailJS environment variables in Netlify:

1. Go to Site settings > Environment variables
2. Add the same variables from your `.env` file

## Additional Documentation

- [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) - Detailed guide for EmailJS configuration
- [TESTING.md](./TESTING.md) - Guide for testing the contact form
- [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) - Comprehensive Netlify deployment guide