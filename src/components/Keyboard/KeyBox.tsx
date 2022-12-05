import KeyCard from "@/components/Keyboard/KeyCard";
import { WORD_STATE } from "@/const/wordle";
import { useWordle } from "@/hooks";
import { mq } from "@/styles";
import { WordState } from "@/types";
import { css } from "@emotion/react";
import { useMemo } from "react";

interface Props {
  keys: string[];
}

const KeyBox = ({ keys }: Props) => {
  const { words, currentWordsIndex } = useWordle();
  const charStateInfoObj: {
    [key: string]: WordState;
  } = {};

  // 초기화
  keys.forEach((key) => {
    charStateInfoObj[key] = WORD_STATE.INIT.type;
  });

  // char 상태 업데이트
  words.flat().forEach(({ char, state }) => {
    if (!char) return;
    if (!keys.includes(char)) return;

    switch (state) {
      // 정답인 경우 있던 없던 정답으로 덮어씌우기
      case WORD_STATE.ANSWER.type:
        charStateInfoObj[char] = state;
        break;

      // 존재하는 경우: 이미 정답이라면 정답으로, 아니라면 존재 상태로
      case WORD_STATE.EXIST.type:
        if (charStateInfoObj[char] === WORD_STATE.ANSWER.type) break;
        charStateInfoObj[char] = state;
        break;

      // 초기 상태 or 존재하지도 않는 경우: 현상 유지
      default:
        if (charStateInfoObj[char] === WORD_STATE.ANSWER.type) break;
        if (charStateInfoObj[char] === WORD_STATE.EXIST.type) break;
        charStateInfoObj[char] = state;
    }
  });

  const keysStateObjArray = useMemo(
    () =>
      Object.entries(charStateInfoObj).map(([key, state]) => ({
        key,
        state,
      })),
    [currentWordsIndex]
  );

  return (
    <>
      <div css={Container}>
        {keysStateObjArray.map(({ key, state }) => (
          <KeyCard key={key} text={key} state={state} />
        ))}
      </div>
    </>
  );
};

export default KeyBox;

const Container = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.2rem",
  width: "100%",
  height: "auto",
  [mq[1]]: {
    gap: "0.4rem",
  },
});
