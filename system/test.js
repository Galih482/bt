import fs from 'fs';
import path, { dirname } from 'path';
import assert from 'assert';
import syntaxError from 'syntax-error';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(__dirname);

function getAllJsFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(getAllJsFiles(filePath));
        } else if (file.endsWith('.js')) {
            results.push(filePath);
        }
    });

    return results;
}

const packageJson = require(path.join(__dirname, '../package.json'));
const directories = packageJson.directories || {};
const folders = Object.values(directories); 

let files = [];

for (let folder of folders) {
    const folderPath = path.join(__dirname, '..', folder); 
    files = files.concat(getAllJsFiles(folderPath));
}

for (let file of files) {
    if (file === __filename) continue; 
    console.error('Checking', file);
    const error = syntaxError(fs.readFileSync(file, 'utf8'), file, {
        sourceType: 'module',
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true
    });
    if (error) assert.ok(error.length < 1, file + '\n\n' + error);
    assert.ok(file);
    console.log('Done', file);
}