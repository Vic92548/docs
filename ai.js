const fs = require('fs').promises;
const path = require('path');

async function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            arrayOfFiles = await getAllFiles(filePath, arrayOfFiles);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.mdx' || ext === '.json') {
                arrayOfFiles.push(filePath);
            }
        }
    }

    return arrayOfFiles;
}

async function generateMarkdown() {
    try {
        const baseDir = '.'; // Changed to current directory
        const outputFile = 'ai_documentation.md';
        const files = await getAllFiles(baseDir);

        let markdownContent = `# Project Documentation\n\nThis document contains all MDX and JSON files from the current directory.\n\n`;

        for (const file of files) {
            const relativePath = path.relative(baseDir, file);
            const content = await fs.readFile(file, 'utf8');
            const extension = path.extname(file).slice(1);

            markdownContent += `## File: ${relativePath}\n\n\`\`\`${extension}\n${content}\n\`\`\`\n\n`;
        }

        await fs.writeFile(outputFile, markdownContent);
        console.log(`Successfully generated ${outputFile} with ${files.length} files`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the script
generateMarkdown();