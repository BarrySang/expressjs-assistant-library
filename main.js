/**
 * install express
 */
const { exec } = require('child_process');

// Run 'npm install express'
exec('npm i --save-dev express', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Output: ${stdout}`);
});

exec('npm run generate-project-structure', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Output: ${stdout}`);
});

// generate project structure

/**
 * - controllers
 * - node_modules *
 * - db_setup
 * - routes
 * -- readme.md
 * -- postman-collection.json
 * -- server.js
 */

