import emailjs from 'emailjs-com';

/**
 * Initialize EmailJS with the user ID
 * This should be called once when the application starts
 */
export const initEmailJS = (): void => {
  const userId = import.meta.env.VITE_EMAILJS_USER_ID || process.env.REACT_APP_EMAILJS_USER_ID;
  
  if (userId) {
    emailjs.init(userId);
  } else {
    console.warn('EmailJS user ID not found. Contact form will not work properly.');
  }
};