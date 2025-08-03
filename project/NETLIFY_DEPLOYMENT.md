# Netlify Deployment Guide

This guide will help you deploy your portfolio website to Netlify.

## Prerequisites

1. A GitHub account
2. Your project pushed to a GitHub repository
3. A Netlify account (you can sign up for free at [netlify.com](https://www.netlify.com/))

## Step 1: Prepare Your Project

1. Make sure your project builds correctly locally:
   ```bash
   npm run build
   ```
   This should create a `dist` folder with your built project.

2. Ensure your `netlify.toml` file is properly configured:
   - The file should be in the root of your project (already created)
   - If your project files are in a subdirectory (like `project/`), make sure the `base` setting in `netlify.toml` points to that directory:
     ```toml
     [build]
       base = "project/"
     ```

3. Commit and push all changes to your GitHub repository:
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push
   ```

## Step 2: Deploy to Netlify

### Option 1: Deploy via Netlify UI

1. Log in to your Netlify account
2. Click "Add new site" > "Import an existing project"
3. Select GitHub as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select your portfolio repository
6. Configure the deployment settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Log in to Netlify:
   ```bash
   netlify login
   ```

3. Initialize your site:
   ```bash
   netlify init
   ```

4. Follow the prompts to either create a new site or connect to an existing one

5. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

## Step 3: Configure Environment Variables

To ensure your EmailJS functionality works in production:

1. Go to your site's dashboard on Netlify
2. Navigate to Site settings > Environment variables
3. Add the following environment variables:
   - `VITE_EMAILJS_SERVICE_ID`: Your EmailJS service ID
   - `VITE_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
   - `VITE_EMAILJS_USER_ID`: Your EmailJS user ID

## Step 4: Set Up Custom Domain (Optional)

1. In your Netlify site dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to set up your domain

## Step 5: Verify Deployment

1. Visit your deployed site (Netlify provides a default URL like `your-site-name.netlify.app`)
2. Test the contact form to ensure EmailJS is working correctly
3. Check that all pages and features are functioning as expected

## Troubleshooting

### Contact Form Not Working

If the contact form is not sending emails:

1. Check that you've added all required environment variables in Netlify
2. Verify that your EmailJS service, template, and user IDs are correct
3. Check the browser console for any errors
4. Ensure your EmailJS template variables match those in your code

### Build Failures

If your build fails on Netlify:

1. Check the build logs in Netlify for specific errors
2. Ensure your project builds successfully locally
3. Verify that your `netlify.toml` configuration is correct, especially the `base` directory setting
4. Make sure the `base` directory in `netlify.toml` is set to `project/` if your project files are in a subdirectory

## Continuous Deployment

Netlify automatically sets up continuous deployment from your GitHub repository. Any changes pushed to your main branch will trigger a new build and deployment.

## Need Help?

If you encounter any issues with your Netlify deployment, you can:

1. Check the [Netlify documentation](https://docs.netlify.com/)
2. Visit the [Netlify Community forum](https://community.netlify.com/)
3. Contact Netlify support through your dashboard