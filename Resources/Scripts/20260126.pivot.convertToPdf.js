#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlPath = path.join(__dirname, 'sample_resume_jennifer_martinez.html');
const pdfPath = path.join(__dirname, 'sample_resume_jennifer_martinez.pdf');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Try using puppeteer if available, otherwise provide instructions
(async () => {
  try {
    // Try to require puppeteer
    let puppeteer;
    try {
      puppeteer = require('puppeteer');
    } catch (e) {
      console.log('📦 Puppeteer not found. Installing...');
      const { execSync } = require('child_process');
      execSync('npm install --no-save puppeteer', { stdio: 'inherit', cwd: __dirname });
      puppeteer = require('puppeteer');
    }

    console.log('🚀 Launching browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    console.log('📄 Loading HTML content...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    console.log('💾 Generating PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'Letter',
      margin: {
        top: '0.75in',
        right: '0.75in',
        bottom: '0.75in',
        left: '0.75in'
      },
      printBackground: true
    });
    
    await browser.close();
    
    console.log('✅ PDF created successfully!');
    console.log(`📄 Location: ${pdfPath}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📋 Manual conversion instructions:');
    console.log('1. Open sample_resume_jennifer_martinez.html in Chrome or Safari');
    console.log('2. Press Cmd+P (Print)');
    console.log('3. Click "Save as PDF"');
    console.log('4. Save as "sample_resume_jennifer_martinez.pdf"');
  }
})();

