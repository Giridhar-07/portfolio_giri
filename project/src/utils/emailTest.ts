import emailjs from 'emailjs-com';

/**
 * Test function to verify EmailJS configuration
 * This can be run from the browser console to test if EmailJS is properly configured
 */
export const testEmailJS = async (): Promise<void> => {
  try {
    // Get EmailJS credentials from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID || process.env.REACT_APP_EMAILJS_USER_ID;
    
    console.log('EmailJS Configuration:', { 
      serviceId: serviceId ? 'Found' : 'Missing', 
      templateId: templateId ? 'Found' : 'Missing', 
      userId: userId ? 'Found' : 'Missing' 
    });
    
    if (!serviceId || !templateId || !userId) {
      throw new Error('EmailJS configuration is missing');
    }
    
    // Initialize EmailJS
    emailjs.init(userId);
    
    // Prepare test template parameters
    const templateParams = {
      from_name: 'Test User',
      from_email: 'test@example.com',
      subject: 'Test Email',
      message: 'This is a test email to verify EmailJS integration',
      to_email: 'giridharmalagi7@gmail.com'
    };
    
    console.log('Sending test email...');
    
    // Send test email using EmailJS
    const response = await emailjs.send(serviceId, templateId, templateParams, userId);
    
    console.log('Test email sent successfully:', response);
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to send test email:', error);
    return Promise.reject(error);
  }
};

// Add to window object for testing from console
declare global {
  interface Window {
    testEmailJS: () => Promise<void>;
  }
}

// Only add to window in browser environment
if (typeof window !== 'undefined') {
  window.testEmailJS = testEmailJS;
}