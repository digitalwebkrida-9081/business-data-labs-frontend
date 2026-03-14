
const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_STANDALONE = path.join(__dirname, '.next', 'standalone');
const SOURCE_STATIC = path.join(__dirname, '.next', 'static');
const SOURCE_PUBLIC = path.join(__dirname, 'public');
const DEST = path.join(__dirname, 'deploy-package');

// Helper to copy directory recursive
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('📦 Packaging standalone build for deployment...');

// 1. Clean previous package
if (fs.existsSync(DEST)) {
    console.log('Cleaning previous package...');
    fs.rmSync(DEST, { recursive: true, force: true });
}
fs.mkdirSync(DEST);

// 2. Copy Standalone (Server + Code)
if (fs.existsSync(SOURCE_STANDALONE)) {
    console.log('Copying standalone server...');
    copyDir(SOURCE_STANDALONE, DEST);
} else {
    console.error('❌ Error: .next/standalone not found. Did you run "npm run build"?');
    process.exit(1);
}

// 3. Copy Static Assets (.next/static -> .next/static)
// Standalone needs these at specific path: .next/static relative to server.js
const destStatic = path.join(DEST, '.next', 'static');
if (fs.existsSync(SOURCE_STATIC)) {
    console.log('Copying static assets...');
    copyDir(SOURCE_STATIC, destStatic);
}

// 4. Copy Public Assets (public -> public)
const destPublic = path.join(DEST, 'public');
if (fs.existsSync(SOURCE_PUBLIC)) {
    console.log('Copying public files...');
    copyDir(SOURCE_PUBLIC, destPublic);
}

console.log(`
✅ Build packaged successfully at: ./deploy-package

DEPLOYMENT INSTRUCTIONS:
1. Upload the CONTENTS of the 'deploy-package' folder to your server (e.g., /var/www/my-app).
2. Ensure Node.js is installed on the server.
3. Run the server using PM2 or Node:
   $ pm2 start server.js --name "data-scraper-frontend" --port 3000
   OR
   $ node server.js

NGINX CONFIG:
Ensure Nginx proxies to the running port (default 3000):
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
`);
