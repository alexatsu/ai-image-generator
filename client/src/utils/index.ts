import { prompts } from "../lib";
import FileSaver from "file-saver";

const getRandomPrompt = (prompt: string): string => {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  const randomPrompt = prompts[randomIndex];
  if (randomPrompt === prompt) return getRandomPrompt(prompt);
  return randomPrompt;
};
const downloadImage = async (id: string, photo: string) => {
  FileSaver.saveAs(photo, `download-${id}.jpg`);
};

export { getRandomPrompt, downloadImage };
