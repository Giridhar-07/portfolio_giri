#!/bin/bash

# Netlify Deployment Shell Script

# ANSI color codes
RESET="\033[0m"
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BLUE="\033[0;34m"
MAGENTA="\033[0;35m"
CYAN="\033[0;36m"
BOLD="\033[1m"

# Display header
echo -e "\n${BOLD}${CYAN}===== Netlify Deployment Script =====${RESET}\n"

# Check if .env file exists
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ .env file found${RESET}"
else
    echo -e "${RED}✗ .env file not found!${RESET}"
    echo "Creating template .env file..."
    
    # Create template .env file
    cat > .env << EOL
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
EOL
    
    echo -e "${YELLOW}⚠ A template .env file has been created. Please fill in your actual EmailJS credentials.${RESET}"
    exit 1
fi

# Check if netlify.toml exists
if [ -f "netlify.toml" ]; then
    echo -e "${GREEN}✓ netlify.toml file found${RESET}"
else
    echo -e "${RED}✗ netlify.toml file not found!${RESET}"
    exit 1
fi

# Ask if user wants to build the project
echo -e "\n${CYAN}Do you want to build the project now? (y/n)${RESET}"
read -r buildChoice

if [ "$buildChoice" = "y" ]; then
    echo -e "\n${CYAN}Building project...${RESET}"
    npm run build
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ Build failed!${RESET}"
        exit 1
    else
        echo -e "${GREEN}✓ Build completed successfully!${RESET}"
    fi
else
    echo -e "${YELLOW}Build skipped.${RESET}"
fi

# Ask if user wants to deploy to Netlify
echo -e "\n${CYAN}Do you want to deploy to Netlify now? (y/n)${RESET}"
read -r deployChoice

if [ "$deployChoice" = "y" ]; then
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
        echo -e "${YELLOW}⚠ Netlify CLI not found. Installing...${RESET}"
        npm install -g netlify-cli
    fi
    
    # Login to Netlify if needed
    echo -e "\n${CYAN}Checking Netlify authentication...${RESET}"
    netlify status
    
    if [ $? -ne 0 ]; then
        echo -e "${CYAN}Please log in to Netlify:${RESET}"
        netlify login
    fi
    
    # Deploy to Netlify
    echo -e "\n${CYAN}Deploying to Netlify...${RESET}"
    netlify deploy --prod
else
    echo -e "\n${CYAN}Deployment Instructions:${RESET}"
    echo "1. Push your code to GitHub"
    echo "2. Log in to Netlify and create a new site from Git"
    echo "3. Select your GitHub repository"
    echo "4. Set build command: npm run build"
    echo "5. Set publish directory: dist"
    echo "6. Add environment variables in Netlify settings"
    echo -e "\n${CYAN}For more detailed instructions, refer to the NETLIFY_DEPLOYMENT.md file.${RESET}"
fi

echo -e "\n${BOLD}${CYAN}===== Script Completed =====${RESET}\n"