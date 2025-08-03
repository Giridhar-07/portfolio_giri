# Netlify Deployment Checklist

Use this checklist to ensure your portfolio website is properly deployed to Netlify.

## Pre-Deployment Checklist

### Environment Variables
- [ ] Create an `.env` file with the following variables:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_USER_ID`

### EmailJS Setup
- [ ] Create an EmailJS account
- [ ] Set up an email service
- [ ] Create an email template with the correct variables
- [ ] Test the email functionality locally

### Code Quality
- [ ] Run `npm run lint` to check for code issues
- [ ] Fix any linting errors
- [ ] Test the application locally with `npm run dev`
- [ ] Verify all features work as expected

### Build Process
- [ ] Run `npm run build` to create a production build
- [ ] Verify the build completes successfully
- [ ] Test the production build locally with `npm run preview`

## Deployment Checklist

### GitHub Setup
- [ ] Initialize Git repository (if not already done)
  ```bash
  git init
  ```
- [ ] Add all files to Git
  ```bash
  git add .
  ```
- [ ] Commit changes
  ```bash
  git commit -m "Prepare for Netlify deployment"
  ```
- [ ] Create a GitHub repository
- [ ] Push code to GitHub
  ```bash
  git remote add origin https://github.com/yourusername/your-repo-name.git
  git push -u origin main
  ```

### Netlify Setup
- [ ] Create a Netlify account at [netlify.com](https://www.netlify.com/)
- [ ] Click "Add new site" > "Import an existing project"
- [ ] Connect to GitHub and select your repository
- [ ] Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] Add environment variables in Netlify:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_USER_ID`
- [ ] Deploy the site

## Post-Deployment Checklist

### Testing
- [ ] Visit your deployed site (e.g., `https://your-site-name.netlify.app`)
- [ ] Test navigation and all pages
- [ ] Test the contact form by sending a test email
- [ ] Verify mobile responsiveness
- [ ] Check for any console errors

### Domain Setup (Optional)
- [ ] Purchase a custom domain (if desired)
- [ ] Configure DNS settings
- [ ] Add custom domain in Netlify
- [ ] Set up HTTPS

### Analytics and Monitoring
- [ ] Set up Netlify Analytics (optional)
- [ ] Add Google Analytics (optional)
- [ ] Configure form submissions in Netlify (optional)

## Troubleshooting

### Common Issues

#### Build Failures
- Check the build logs in Netlify
- Verify your project builds locally
- Check for missing dependencies

#### Contact Form Issues
- Verify environment variables are set correctly in Netlify
- Check browser console for errors
- Verify EmailJS template variables match your code

#### Routing Issues
- Ensure the `_redirects` file is in the `public` directory
- Verify the `netlify.toml` file has the correct redirects configuration

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)