// this node script scans the dist folder and compresses all files with brotli
const uglify = require('uglify-js');
const fs = require('fs');
const path = require('path');

function uglifyFolder(distDir) {
  if(!fs.existsSync(distDir)) return console.log(`No folder found at ${distDir}`);

  // list only files in the dist folder
  const files = fs.readdirSync(distDir).filter(file => fs.lstatSync(path.resolve(distDir, file)).isFile());

  console.groupCollapsed(`Uglify`, distDir);

  files.forEach(file => {
    if(!file.endsWith('.js')) return; 

    const filePath = path.resolve(distDir, file);
    const fileContents = fs.readFileSync(filePath);

    const result = uglify.minify(fileContents.toString(), {
      toplevel: true,
      compress: {
        passes: 2,
      },
      mangle: {
        toplevel: true,
      },
    });

    if(result.error) {
      console.error(result.error);
      return;
    }

    const code = `(()=>{${result.code}})();`;
    fs.writeFileSync(filePath, code);
      
    console.log(`${file} - ${fileContents.length} → ${code.length}`);
  });
  
  console.groupEnd();
}


uglifyFolder(path.resolve(__dirname, '../www/assets/js/'));
uglifyFolder(path.resolve(__dirname, '../www/assets/js/templates/'));
