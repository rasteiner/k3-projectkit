const fs = require('fs');
const path = require('path');

//delete all files in ../www/assets/js/ and ../www/assets/css/
const jsPath = path.resolve(__dirname, '../www/assets/js/');
const templatesPath = path.resolve(__dirname, '../www/assets/js/templates/');
const cssPath = path.resolve(__dirname, '../www/assets/css/');

function clean(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        clean(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

clean(jsPath);
clean(templatesPath);
clean(cssPath);