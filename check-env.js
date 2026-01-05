import fs from "fs";

if (!fs.existsSync(".env")) {
  console.error("файл .env отсутствует");
  process.exit(1);
}

console.log("ENV проверен");
