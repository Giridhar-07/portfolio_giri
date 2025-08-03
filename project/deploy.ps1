# Netlify Deployment PowerShell Script

# Display header
Write-Host ""
Write-Host "===== Netlify Deployment Script =====" -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
if (Test-Path ".env") {
    Write-Host "✓ .env file found" -ForegroundColor Green
} else {
    Write-Host "✗ .env file not found!" -ForegroundColor Red
    Write-Host "Creating template .env file..."
    
    # Create template .env file
    @"
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
"@ | Out-File -FilePath ".env" -Encoding utf8
    
    Write-Host "⚠ A template .env file has been created. Please fill in your actual EmailJS credentials." -ForegroundColor Yellow
    exit 1
}

# Check if netlify.toml exists
if (Test-Path "netlify.toml") {
    Write-Host "✓ netlify.toml file found" -ForegroundColor Green
} else {
    Write-Host "✗ netlify.toml file not found!" -ForegroundColor Red
    exit 1
}

# Ask if user wants to build the project
Write-Host ""
Write-Host "Do you want to build the project now? (y/n)" -ForegroundColor Cyan
$buildChoice = Read-Host

if ($buildChoice -eq "y") {
    Write-Host ""
    Write-Host "Building project..." -ForegroundColor Cyan
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Build failed!" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "✓ Build completed successfully!" -ForegroundColor Green
    }
} else {
    Write-Host "Build skipped." -ForegroundColor Yellow
}

# Ask if user wants to deploy to Netlify
Write-Host ""
Write-Host "Do you want to deploy to Netlify now? (y/n)" -ForegroundColor Cyan
$deployChoice = Read-Host

if ($deployChoice -eq "y") {
    # Check if Netlify CLI is installed
    $netlifyInstalled = $null
    try {
        $netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
    } catch {}
    
    if ($null -eq $netlifyInstalled) {
        Write-Host "⚠ Netlify CLI not found. Installing..." -ForegroundColor Yellow
        npm install -g netlify-cli
    }
    
    # Login to Netlify if needed
    Write-Host ""
    Write-Host "Checking Netlify authentication..." -ForegroundColor Cyan
    netlify status
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Please log in to Netlify:" -ForegroundColor Cyan
        netlify login
    }
    
    # Deploy to Netlify
    Write-Host ""
    Write-Host "Deploying to Netlify..." -ForegroundColor Cyan
    netlify deploy --prod
} else {
    Write-Host ""
    Write-Host "Deployment Instructions:" -ForegroundColor Cyan
    Write-Host "1. Push your code to GitHub"
    Write-Host "2. Log in to Netlify and create a new site from Git"
    Write-Host "3. Select your GitHub repository"
    Write-Host "4. Set build command: npm run build"
    Write-Host "5. Set publish directory: dist"
    Write-Host "6. Add environment variables in Netlify settings"
    Write-Host ""
    Write-Host "For more detailed instructions, refer to the NETLIFY_DEPLOYMENT.md file." -ForegroundColor Cyan
}

Write-Host ""
Write-Host "===== Script Completed =====" -ForegroundColor Cyan
Write-Host ""