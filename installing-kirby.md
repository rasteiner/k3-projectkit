```bash
composer create-project getkirby/plainkit www --ignore-platform-reqs 
cd www
composer require schnti/cachebuster --ignore-platform-reqs
cd ..
cp scripts/templates/.htaccess www/
rm -rf scripts/templates
git add . 
git commit -m "kirby installed"
```