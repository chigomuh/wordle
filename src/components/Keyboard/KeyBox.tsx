import KeyCard from "@/components/Keyboard/KeyCard";
import { useWordle } from "@/hooks";
import { mq } from "@/styles";
import getKeysStateObjArray from "@/util/wordle/getKeysStateObjArray";
import { css } from "@emotion/react";

interface Props {
  keys: string[];
}

const KeyBox = ({ keys }: Props) => {
  const { words } = useWordle();
  const keysStateObjArray = getKeysStateObjArray(keys, words);

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
