#!/usr/bin/env node

/**
 * Pre-deployment check script
 * 
 * This script verifies that your project is ready for deployment by:
 * 1. Checking for required environment variables
 * 2. Validating the build output
 * 3. Checking for common deployment issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

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

// Check if .env file exists and has required variables
const checkEnvFile = () => {
  log.section('Checking Environment Variables');
  
  const envPath = path.join(projectRoot, '.env');
  let missingVars = [];
  let hasEnvFile = false;
  
  if (fs.existsSync(envPath)) {
    hasEnvFile = true;
    const envContent = fs.readFileSync(envPath, 'utf8');
    const requiredVars = [
      'VITE_EMAILJS_SERVICE_ID',
      'VITE_EMAILJS_TEMPLATE_ID',
      'VITE_EMAILJS_USER_ID'
    ];
    
    requiredVars.forEach(varName => {
      if (!envContent.includes(`${varName}=`) || envContent.includes(`${varName}=your_`)) {
        missingVars.push(varName);
      }
    });
  } else {
    log.warning('.env file not found!');
  }
  
  if (missingVars.length > 0) {
    log.error(`Missing or incomplete environment variables: ${missingVars.join(', ')}`);
    log.warning('These variables will need to be added in Netlify environment settings.');
  } else if (hasEnvFile) {
    log.success('All required environment variables are present in .env file.');
  }
  
  log.info('Remember to add these environment variables in your Netlify site settings.');
};

// Check if build directory exists and contains expected files
const checkBuildOutput = () => {
  log.section('Checking Build Output');
  
  const distPath = path.join(projectRoot, 'dist');
  
  if (!fs.existsSync(distPath)) {
    log.error('Build directory (dist) not found!');
    log.info('Run "npm run build" to generate the build output.');
    return false;
  }
  
  // Check for index.html
  if (!fs.existsSync(path.join(distPath, 'index.html'))) {
    log.error('index.html not found in build directory!');
    return false;
  }
  
  // Check for assets directory
  const assetsPath = path.join(distPath, 'assets');
  if (!fs.existsSync(assetsPath)) {
    log.error('assets directory not found in build output!');
    return false;
  }
  
  // Check for JS and CSS files
  const files = fs.readdirSync(assetsPath);
  const hasJS = files.some(file => file.endsWith('.js'));
  const hasCSS = files.some(file => file.endsWith('.css'));
  
  if (!hasJS) {
    log.error('No JavaScript files found in build output!');
    return false;
  }
  
  if (!hasCSS) {
    log.error('No CSS files found in build output!');
    return false;
  }
  
  log.success('Build output looks good!');
  return true;
};

// Check for Netlify configuration files
const checkNetlifyConfig = () => {
  log.section('Checking Netlify Configuration');
  
  const netlifyTomlPath = path.join(projectRoot, 'netlify.toml');
  const redirectsPath = path.join(projectRoot, 'public', '_redirects');
  
  if (!fs.existsSync(netlifyTomlPath)) {
    log.error('netlify.toml file not found!');
    return false;
  } else {
    log.success('netlify.toml file found.');
    
    // Check if base directory is correctly set
    const netlifyConfig = fs.readFileSync(netlifyTomlPath, 'utf8');
    if (!netlifyConfig.includes('base = "project/"')) {
      log.error('The base directory in netlify.toml is not correctly set!');
      log.info('If your project files are in a subdirectory, ensure the base setting is: base = "project/"');
      log.info('This is critical for Netlify to find your package.json file during deployment.');
      return false;
    } else {
      log.success('Base directory in netlify.toml is correctly set.');
    }
  }
  
  if (!fs.existsSync(redirectsPath)) {
    log.warning('_redirects file not found in public directory!');
    log.info('This file is recommended for handling client-side routing in SPAs.');
  } else {
    log.success('_redirects file found.');
  }
  
  return true;
};

// Main function
const main = () => {
  console.log(`\n${colors.bright}${colors.magenta}=== Netlify Deployment Readiness Check ===${colors.reset}\n`);
  
  checkEnvFile();
  const buildOk = checkBuildOutput();
  const configOk = checkNetlifyConfig();
  
  log.section('Summary');
  
  if (buildOk && configOk) {
    log.success('Your project is ready for deployment to Netlify!');
    log.info('Next steps:');
    log.info('1. Push your code to GitHub');
    log.info('2. Connect your repository to Netlify');
    log.info('3. Configure build settings and environment variables');
    log.info('4. Deploy your site');
    process.exit(0);
  } else {
    log.error('Your project has issues that need to be addressed before deployment.');
    log.info('Please fix the issues mentioned above and run this check again.');
    process.exit(1);
  }
};

// Run the script
main();