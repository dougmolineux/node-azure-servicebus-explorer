const fs = require('fs').promises;

const readFile = async (path) => {
  try {
    const buffer = await fs.readFile(path);
    return buffer.toLocaleString();
  } catch (error) {
    console.log(`Failed to read file "${path}" with error:`, error);
    return '';
  }
};

module.exports = readFile;
