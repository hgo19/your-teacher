import fs from "fs/promises";
import path from "path";

async function saveFile(file, filePath) {
  const uploadDir = path.join("public", "uploads");

  await fs.mkdir(uploadDir, { recursive: true });

  await fs.writeFile(filePath, file.buffer);

  return filePath;
}

export default saveFile;
