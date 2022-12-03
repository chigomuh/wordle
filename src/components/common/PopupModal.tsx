import { css, keyframes } from "@emotion/react";
import { mq } from "@/styles";

interface Props {
  children: React.ReactNode;
}

const PopupModal = ({ children }: Props) => {
  return (
    <>
      <div css={PopupContainer}>
        <div css={BackPopup}></div>
        <div css={Popup}>
          <div css={PopupBox}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default PopupModal;

const ShowBottom = keyframes({
  "0%": {
    bottom: "-100%",
  },
  "100%": {
    bottom: "0",
  },
});

const ShowBottomTopProp = keyframes({
  "0%": {
    transform: "translate(-50%, 100%)",
  },
  "100%": {
    transform: "translate(-50%, -50%)",
  },
});

const PopupBox = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  gap: "1rem",
  padding: "1rem",
});

const PopupContainer = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100vh",
  zIndex: "999",
  overflow: "hidden",
});

const BackPopup = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "#ffffff",
  opacity: "0.5",
  zIndex: "100",
});

const Popup = css({
  position: "absolute",
  bottom: "0",
  left: "0",
  transform: "none",
  width: "100%",
  height: "80%",
  maxHeight: "35rem",
  backgroundColor: "#ffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  color: "#000000",
  boxShadow: "0 4px 23px 0 rgb(0 0 0 / 20%)",
  border: "1px solid #e2e2e2",
  borderRadius: "2rem 2rem 0 0",
  animation: `${ShowBottom} 0.5s ease-in-out forwards`,
  zIndex: "999",
  [mq[1]]: {
    top: "50%",
    left: "50%",
    maxWidth: "30rem",
    borderRadius: "0.5rem",
    animation: `${ShowBottomTopProp} 0.5s ease-in-out forwards`,
  },
});
