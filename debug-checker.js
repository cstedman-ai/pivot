// Quick Node.js script to check all configurations
const fs = require('fs');
const path = require('path');

console.log('🔍 Pivot Configuration Checker\n');

// Check frontend .env
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
if (fs.existsSync(frontendEnvPath)) {
  const content = fs.readFileSync(frontendEnvPath, 'utf8');
  console.log('📁 Frontend .env exists:');
  console.log(content);
  console.log('---\n');
} else {
  console.log('⚠️  Frontend .env does NOT exist\n');
}

// Check backend .env
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (fs.existsSync(backendEnvPath)) {
  const content = fs.readFileSync(backendEnvPath, 'utf8');
  console.log('📁 Backend .env exists:');
  console.log(content.replace(/sk-proj-[A-Za-z0-9_-]+/g, 'sk-proj-***HIDDEN***'));
  console.log('---\n');
} else {
  console.log('⚠️  Backend .env does NOT exist\n');
}

// Check vite.config
const viteConfigPath = path.join(__dirname, 'frontend', 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  const content = fs.readFileSync(viteConfigPath, 'utf8');
  console.log('📁 Vite config:');
  console.log(content);
  console.log('---\n');
}

// Check api.ts
const apiPath = path.join(__dirname, 'frontend', 'src', 'services', 'api.ts');
if (fs.existsSync(apiPath)) {
  const content = fs.readFileSync(apiPath, 'utf8');
  console.log('📁 API service (first 40 lines):');
  console.log(content.split('\n').slice(0, 40).join('\n'));
  console.log('---\n');
}
