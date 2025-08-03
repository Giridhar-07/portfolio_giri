# Testing the Contact Form

## EmailJS Configuration

Before testing the contact form, you need to set up EmailJS with your credentials:

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

## Testing Methods

### Method 1: Using the Contact Form

1. Start the development server: `npm run dev`
2. Navigate to the Contact section of the portfolio
3. Fill out the form with test data
4. Submit the form
5. Check for success/error messages
6. Verify that the email was received at giridharmalagi7@gmail.com

### Method 2: Using the Browser Console

A test function has been added to verify EmailJS configuration:

1. Start the development server: `npm run dev`
2. Open the browser console (F12 or right-click > Inspect > Console)
3. Type `testEmailJS()` and press Enter
4. Check the console for success/error messages
5. Verify that the test email was received at giridharmalagi7@gmail.com

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   - Check that the `.env` file exists in the project root
   - Verify that all required variables are set correctly
   - Restart the development server after updating the `.env` file

2. **EmailJS Service/Template Issues**
   - Verify that your EmailJS service is active
   - Check that your template contains all required variables
   - Test the template directly in the EmailJS dashboard

3. **Network Issues**
   - Check browser console for network errors
   - Verify that you have an active internet connection
   - Check if there are any CORS issues

4. **Rate Limiting**
   - Free EmailJS accounts have sending limits
   - Check your EmailJS dashboard for usage statistics

## Logs and Debugging

The application logs EmailJS configuration status and errors to the browser console. To view detailed logs:

1. Open the browser console
2. Look for messages starting with "EmailJS Configuration:" or "Failed to send email:"
3. If you see "EmailJS Configuration: Missing" for any field, check your `.env` file

## Production Deployment

When deploying to production, ensure that you set the environment variables in your hosting platform:

- For Netlify: Set in the site's environment variables section
- For Vercel: Set in the project settings under Environment Variables
- For GitHub Pages: Consider using a different approach as it doesn't support server-side environment variables