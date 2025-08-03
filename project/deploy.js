/**
 * Netlify Deployment Helper Script
 * 
 * This script helps prepare your project for Netlify deployment by:
 * 1. Checking for required environment variables
 * 2. Building the project
 * 3. Providing deployment instructions
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Get current directory (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Helper functions
const log = {
  info: (msg) => console.log(`${colors.blue}${colors.bright}ℹ INFO:${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}${colors.bright}✓ SUCCESS:${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}${colors.bright}⚠ WARNING:${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}${colors.bright}✗ ERROR:${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${colors.bright}=== ${msg} ===${colors.reset}\n`)
};

// Check if .env file exists
const checkEnvFile = () => {
  log.section('Checking Environment Variables');
  
  const envPath = path.join(__dirname, '.env');
  
  if (!fs.existsSync(envPath)) {
    log.error('.env file not found!');
    log.info('Creating a template .env file...');
    
    const envTemplate = 
`VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
`;
    
    fs.writeFileSync(envPath, envTemplate);
    log.warning('A template .env file has been created. Please fill in your actual EmailJS credentials.');
    return false;
  }
  
  // Read .env file and check for required variables
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_USER_ID'
  ];
  
  const missingVars = [];
  
  requiredVars.forEach(varName => {
    if (!envContent.includes(`${varName}=`) || envContent.includes(`${varName}=your_`)) {
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    log.error(`Missing or incomplete environment variables: ${missingVars.join(', ')}`);
    log.warning('Please update your .env file with the correct values before deploying.');
    return false;
  }
  
  log.success('All required environment variables are present.');
  return true;
};

// Check if netlify.toml exists
const checkNetlifyConfig = () => {
  log.section('Checking Netlify Configuration');
  
  const netlifyConfigPath = path.join(__dirname, 'netlify.toml');
  
  if (!fs.existsSync(netlifyConfigPath)) {
    log.error('netlify.toml file not found!');
    log.info('Please create a netlify.toml file with the appropriate configuration.');
    return false;
  }
  
  log.success('netlify.toml file found.');
  return true;
};

// Build the project
const buildProject = () => {
  log.section('Building Project');
  
  try {
    log.info('Running npm run build...');
    execSync('npm run build', { stdio: 'inherit' });
    log.success('Build completed successfully!');
    return true;
  } catch (error) {
    log.error('Build failed!');
    console.error(error);
    return false;
  }
};

// Display deployment instructions
const showDeploymentInstructions = () => {
  log.section('Deployment Instructions');
  
  console.log(`${colors.bright}To deploy your project to Netlify:${colors.reset}\n`);
  console.log('1. Push your code to GitHub');
  console.log('   git add .');
  console.log('   git commit -m "Prepare for deployment"');
  console.log('   git push\n');
  
  console.log('2. Log in to Netlify and create a new site from Git');
  console.log('   - Select your GitHub repository');
  console.log('   - Set build command: npm run build');
  console.log('   - Set publish directory: dist\n');
  
  console.log('3. Add environment variables in Netlify');
  console.log('   - Go to Site settings > Environment variables');
  console.log('   - Add the same variables from your .env file\n');
  
  console.log(`${colors.bright}For more detailed instructions, refer to the NETLIFY_DEPLOYMENT.md file.${colors.reset}`);
};

// Main function
const main = async () => {
  console.log(`\n${colors.bright}${colors.magenta}=== Netlify Deployment Helper ===${colors.reset}\n`);
  
  const envCheck = checkEnvFile();
  const netlifyCheck = checkNetlifyConfig();
  
  if (!envCheck || !netlifyCheck) {
    log.warning('Please fix the issues above before proceeding with deployment.');
    rl.question('Do you want to continue anyway? (y/n): ', (answer) => {
      if (answer.toLowerCase() !== 'y') {
        log.info('Deployment preparation aborted.');
        rl.close();
        return;
      }
      proceedWithDeployment();
    });
  } else {
    proceedWithDeployment();
  }
};

const proceedWithDeployment = () => {
  rl.question('Do you want to build the project now? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      const buildSuccess = buildProject();
      if (buildSuccess) {
        showDeploymentInstructions();
      } else {
        log.error('Please fix the build issues before deploying.');
      }
    } else {
      log.info('Build skipped.');
      showDeploymentInstructions();
    }
    rl.close();
  });
};

// Run the script
main();