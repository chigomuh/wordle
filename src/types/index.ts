type WordState = "ANSWER" | "EXIST" | "NONE" | "INIT";

// 하나의 철자 정보
interface CharObj {
  char: string;
  state: WordState;
}

// 하나의 단어 정보
type Word = CharObj[];

// 전체 단어들 정보
type Words = Word[];

export type { Word, Words, CharObj, WordState };
