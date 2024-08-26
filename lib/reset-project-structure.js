const fs = require('fs');
const path = require('path');

// Array of items to delete
const itemsToDelete = [
    { type: 'folder', name: '../controllers' },
    { type: 'folder', name: '../db-setup' },
    {type: 'folder', name: '../routes'},
    {type: 'file', name: '../README.md'},
    {type: 'file', name: '../server.js'},
    {type: 'file', name: '../postman-collection.json'},
];

/**
 * Deletes specified files and folders.
 * @param {Array} items - Array of items to delete.
 */
function deleteItems(items) {
    items.forEach(item => {
        // Resolve the full path relative to the script directory
        const fullPath = path.join(__dirname, item.name);
        console.log('full-path: ', fullPath)
        
        if (item.type === 'file') {
            deleteFile(fullPath);
        } else if (item.type === 'folder') {
            deleteFolder(fullPath);
        } else {
            console.error(`Unknown item type "${item.type}" for "${item.name}".`);
        }
    });
}

/**
 * Deletes a file.
 * @param {string} filePath - Full path to the file.
 */
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`File "${filePath}" does not exist.`);
            } else {
                console.error(`Error deleting file "${filePath}": ${err.message}`);
            }
            return;
        }
        console.log(`File deleted: ${filePath}`);
    });
}

/**
 * Deletes a folder recursively.
 * @param {string} folderPath - Full path to the folder.
 */
function deleteFolder(folderPath) {
    fs.rm(folderPath, { recursive: true, force: true }, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`Folder "${folderPath}" does not exist.`);
            } else {
                console.error(`Error deleting folder "${folderPath}": ${err.message}`);
            }
            return;
        }
        console.log(`Folder deleted: ${folderPath}`);
    });
}

// Start the deletion process
deleteItems(itemsToDelete);
