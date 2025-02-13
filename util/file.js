const fs = require('fs');

exports.deleteFile = (filePath) => {
    const resolvedPath = filePath.replace(/^[/\\]+/, '')
    fs.unlink(resolvedPath, (err) => {
        if(err) {
            return new Error(err);
        }
    })
}