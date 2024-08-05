import fs from "fs/promises";

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Erro ao excluir o arquivo ${filePath}:`, error);
    throw new Error("Erro ao excluir o arquivo.");
  }
}

export default deleteFile;
