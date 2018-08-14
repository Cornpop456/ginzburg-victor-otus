const fs = require('fs').promises;
const path = require('path');

const dirPath = process.argv[2];

async function processDir(root, accum = Promise.resolve({ files: [], dirs: [root] })) {
  let content = null;

  try {
    content = await fs.readdir(root);
  } catch (err) {
    throw new Error('Нет такой директории!');
  }

  return content.reduce(async (accum, file) => {
    const filePath = path.join(root, file);
    const accumValue = await accum;
    const stats = await fs.lstat(filePath);

    if (!stats.isDirectory()) {
      accumValue.files.push(filePath);
      return accumValue;
    }
    accumValue.dirs.push(filePath);
    return processDir(filePath, accumValue);
  }, accum);
}

function main() {
  processDir(dirPath)
    .then(json => JSON.stringify(json, null, 4))
    .then(console.log)
    .catch(console.log);
}

main();
