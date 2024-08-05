import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import path from "path";
import chatModel from "../../utils/chat-openai-model.js";

const systemTemplate = [
  `You are an assistant for question-answering tasks. `,
  `Use the following pieces of retrieved context to answer `,
  `the question. If you don't know the answer, say that you `,
  `don't know. Use three sentences maximum and keep the `,
  `answer concise.`,
  `Also do it in portuguese.`,
  `\n\n`,
  `{context}`,
].join("");

const parser = new StructuredOutputParser({
  type: "array",
  items: {
    type: "string",
  },
});

export async function teacherAnswerService(input) {
  const filesPath = path.join("public", "uploads");

  const directoryLoader = new DirectoryLoader(filesPath, {
    ".pdf": (path) => new PDFLoader(path),
  });

  const docs = await directoryLoader.load();
  const retriever = await storageKnowledge(docs);

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["human", "{input}"],
  ]);

  const questionAnswerChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt,
    parser,
  });

  const ragChain = await createRetrievalChain({
    retriever,
    combineDocsChain: questionAnswerChain,
  });

  const response = await ragChain.invoke({
    input,
  });

  return response.answer;
}

async function storageKnowledge(docs) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splits = await textSplitter.splitDocuments(docs);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings(),
  );

  const retriever = vectorstore.asRetriever();
  return retriever;
}
