import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to find all image files recursively
function findImageFiles(dir, imageFiles = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other unnecessary directories
      if (!['node_modules', '.git', 'dist', 'build', '.next', 'image-backup'].includes(file)) {
        findImageFiles(filePath, imageFiles);
      }
    } else {
      // Check if it's an image file
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
        imageFiles.push(filePath);
      }
    }
  }
  
  return imageFiles;
}

// Function to compress images
async function compressImages() {
  const projectRoot = './';
  const backupDir = './image-backup';
  
  console.log('🔍 Scanning for all images in the project...');
  
  // Find all image files
  const allImageFiles = findImageFiles(projectRoot);
  
  console.log(`📸 Found ${allImageFiles.length} images to compress...`);
  
  // Create backup directory
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let processedCount = 0;
  
  for (const imagePath of allImageFiles) {
    try {
      const relativePath = path.relative(projectRoot, imagePath);
      const ext = path.extname(imagePath).toLowerCase();
      
      // Skip if already compressed (check file size)
      const stats = fs.statSync(imagePath);
      if (stats.size < 100 * 1024) { // Skip if already under 100KB
        console.log(`⏭️  Skipping ${relativePath} (already small: ${(stats.size / 1024).toFixed(1)}KB)`);
        continue;
      }
      
      console.log(`🔄 Compressing ${relativePath}...`);
      
      // Create backup
      const backupPath = path.join(backupDir, relativePath);
      const backupDirPath = path.dirname(backupPath);
      if (!fs.existsSync(backupDirPath)) {
        fs.mkdirSync(backupDirPath, { recursive: true });
      }
      fs.copyFileSync(imagePath, backupPath);
      
      // Get original size
      const originalSize = stats.size;
      totalOriginalSize += originalSize;
      
      // Compress based on file type
      let compressedBuffer;
      
      if (['.jpg', '.jpeg'].includes(ext)) {
        compressedBuffer = await sharp(fs.readFileSync(imagePath))
          .resize(1920, 1920, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .jpeg({ 
            quality: 85, 
            progressive: true,
            mozjpeg: true
          })
          .toBuffer();
      } else if (ext === '.png') {
        compressedBuffer = await sharp(fs.readFileSync(imagePath))
          .resize(1920, 1920, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .png({ 
            quality: 85,
            compressionLevel: 9
          })
          .toBuffer();
      } else if (ext === '.webp') {
        compressedBuffer = await sharp(fs.readFileSync(imagePath))
          .resize(1920, 1920, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .webp({ 
            quality: 85
          })
          .toBuffer();
      } else {
        // For other formats, just copy
        compressedBuffer = fs.readFileSync(imagePath);
      }
      
      // Write compressed image back to original location
      fs.writeFileSync(imagePath, compressedBuffer);
      
      // Get compressed size
      const compressedSize = compressedBuffer.length;
      totalCompressedSize += compressedSize;
      processedCount++;
      
      const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ ${relativePath}: ${(originalSize / 1024).toFixed(1)}KB → ${(compressedSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
      
    } catch (error) {
      console.error(`❌ Error compressing ${imagePath}:`, error.message);
    }
  }
  
  // Summary
  console.log('\n🎉 Compression Complete!');
  console.log(`📊 Processed ${processedCount} images`);
  console.log(`📈 Total size reduction: ${((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`💾 Original: ${(totalOriginalSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`💾 Compressed: ${(totalCompressedSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`💾 Saved: ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(1)}MB`);
  console.log(`📁 Backups saved to: ${backupDir}`);
  
  console.log('\n💡 Tips:');
  console.log('• Your website will look exactly the same');
  console.log('• Images will load much faster');
  console.log('• If you need to restore, check the backup folder');
  console.log('• Test your website to ensure everything works perfectly');
}

// Run the compression
compressImages().catch(console.error); 