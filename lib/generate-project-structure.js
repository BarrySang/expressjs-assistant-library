const fs = require('fs');
const path = require('path');

// Array of items to create
const itemsToCreate = [
    { type: 'folder', name: 'controllers' },
    { type: 'folder', name: 'db-setup' },
    {type: 'folder', name: 'routes'},
    {type: 'file', name: 'P-README.md'},
    {type: 'file', name: 'server.js'},
    {type: 'file', name: 'postman-collection.json'},
    // { type: 'file', name: 'myFolder/file1.txt', content: 'Hello, World!' },
    // { type: 'file', name: 'myFolder/subFolder/file2.txt', content: 'This is file 2.' }
];

// @TODO - don't create already existing files
// Function to create files and folders
function createItems(items) {
    items.forEach(item => {
        // Resolve the full path relative to the script directory
        const fullPath = path.join(__dirname, '../'+item.name);
        // console.log('fullpath: ', fullPath)
        if (item.type === 'folder') {
            createFolder(fullPath);
        } else if (item.type === 'file') {
            createFile(fullPath, item.content || '');
        }
    });
}

// Function to create a folder
function createFolder(folderPath) {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
            return console.error(`Error creating folder "${folderPath}": ${err.message}`);
        }
        console.log(`Folder created: ${folderPath}`);
    });
}

// Function to create a file
function createFile(filePath, content) {
    fs.writeFile(filePath, content, { flag: 'wx' }, (err) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error(`File "${filePath}" already exists.`);
            } else {
                console.error(`Error creating file "${filePath}": ${err.message}`);
            }
            return;
        }
        console.log(`File created: ${filePath}`);
    });
}

// Start creating the items
createItems(itemsToCreate);
