import { WORDS } from "@/const/words";

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
};

export { getRandomWord };
