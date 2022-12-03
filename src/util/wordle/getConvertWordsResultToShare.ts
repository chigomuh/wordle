import { WORD_STATE } from "@/const/wordle";
import { Words } from "@/types";
import { getInitWords } from "./getInitWords";

const getConvertWordsResultToShare = (words: Words) => {
  const copy = [...words];
  const result = copy.map((word) =>
    word.reduce((acc, { state }) => {
      switch (state) {
        case WORD_STATE.ANSWER.type:
          return acc + "🟩";
        case WORD_STATE.EXIST.type:
          return acc + "🟨";
        default:
          return acc + "⬜";
      }
    }, "")
  );
  const correntIndex = result.indexOf("🟩".repeat(getInitWords()[0].length));

  return result.slice(0, correntIndex + 1 || undefined).join("\n");
};

export { getConvertWordsResultToShare };
