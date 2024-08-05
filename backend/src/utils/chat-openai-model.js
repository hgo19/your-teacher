import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";
config();

const chatModel = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0.5,
  verbose: true,
});

export default chatModel;
