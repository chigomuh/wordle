import KeyCard from "@/components/Keyboard/KeyCard";
import { css } from "@emotion/react";

interface Props {
  keys: string[];
}

const KeyBox = ({ keys }: Props) => {
  return (
    <>
      <div css={Container}>
        {keys.map((key) => (
          <KeyCard key={key} text={key} />
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
  gap: "0.4rem",
  width: "100%",
  height: "auto",
});
