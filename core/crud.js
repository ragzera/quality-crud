const fs = require("fs");

const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

function create(content) {
  // save content in a file
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

// [SIMULATION]
console.log(create("Eu vou usar pnpm em vez de npm!"));
