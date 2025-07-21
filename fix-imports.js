import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to calculate relative path from one file to another
function getRelativePath(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  const relativePath = path.relative(fromDir, toFile);
  return relativePath.startsWith('.') ? relativePath : './' + relativePath;
}

// Function to convert @ alias to relative path
function convertAliasToRelative(filePath, importPath) {
  const srcDir = '/Users/hkorpol/Downloads/git/PulpeHealth/client/src';
  
  if (importPath.startsWith('@/')) {
    const targetPath = importPath.replace('@/', '');
    const fullTargetPath = path.join(srcDir, targetPath);
    return getRelativePath(filePath, fullTargetPath);
  }
  
  return importPath;
}

// Function to process a file and fix its imports
function fixImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to match import statements with @ alias
    const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)?\s*(?:,\s*{[^}]*})?\s*from\s+["']@\/([^"']+)["']/g;
    
    let newContent = content.replace(importRegex, (match, importPath) => {
      const relativePath = convertAliasToRelative(filePath, '@/' + importPath);
      return match.replace(`"@/${importPath}"`, `"${relativePath}"`).replace(`'@/${importPath}'`, `'${relativePath}'`);
    });
    
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Fixed imports in: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Main execution
const srcDir = '/Users/hkorpol/Downloads/git/PulpeHealth/client/src';
const files = findFiles(srcDir);

console.log(`Found ${files.length} files to process...`);

let fixedCount = 0;
for (const file of files) {
  if (fixImportsInFile(file)) {
    fixedCount++;
  }
}

console.log(`Fixed imports in ${fixedCount} files.`);
