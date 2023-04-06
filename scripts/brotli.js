// this node script scans the dist folder and compresses all files with brotli
const brotli = require('brotli');
const fs = require('fs');
const path = require('path');

function compressFolder(distDir) {
  if(!fs.existsSync(distDir)) return console.log(`No folder found at ${distDir}`);

  // list only files in the dist folder
  const files = fs.readdirSync(distDir).filter(file => fs.lstatSync(path.resolve(distDir, file)).isFile());

  console.groupCollapsed(`Brotli`, distDir);

  files.forEach(file => {
    if(file.endsWith('.br')) return; // skip already compressed files (e.g. main.js.br

    const filePath = path.resolve(distDir, file);
    const fileContents = fs.readFileSync(filePath);
    const compressed = brotli.compress(fileContents, {
      mode: 1,
      quality: 11,
      lgwin: 22
    });
    fs.writeFileSync(filePath + '.br', compressed);
      
    console.log(`${file} - ${fileContents.length} → ${compressed.length}`);
  });
  
  console.groupEnd();
}


compressFolder(path.resolve(__dirname, '../www/assets/js/'));
compressFolder(path.resolve(__dirname, '../www/assets/js/templates/'));
compressFolder(path.resolve(__dirname, '../www/assets/css/'));
