import fs from "fs/promises";
import path from "path";

async function saveFile(file) {
  const uploadDir = path.join("..", "..", "uploads");
  const filePath = path.join(uploadDir, `${Date.now()}-${file.originalname}`);

  await fs.mkdir(uploadDir, { recursive: true });

  await fs.writeFile(filePath, file.buffer);

  return filePath;
}

export default saveFile;
