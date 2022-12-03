import Logo from "@/components/GNB/Logo";
import Icons from "@/components/GNB/Icons";
import { css } from "@emotion/react";
import { mq } from "@/styles";

const Gnb = () => {
  return (
    <>
      <div css={Container}>
        <div css={[MinWidth, Hide]}></div>
        <div css={LogoBox}>
          <Logo />
        </div>
        <div css={[IconBox, MinWidth]}>
          <Icons />
        </div>
      </div>
    </>
  );
};

export default Gnb;

const Hide = css({
  display: "none",
  [mq[1]]: {
    display: "block",
  },
});

const IconBox = css({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "1rem",
  padding: "0 1rem",
});

const LogoBox = css({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "80%",
  padding: "0 1rem",
  fontSize: "2rem",
  fontWeight: "900",
  [mq[1]]: {
    justifyContent: "center",
    padding: "0rem",
  },
});

const MinWidth = css({
  width: "100%",
  maxWidth: "10rem",
});

const Container = css({
  position: "sticky",
  top: "0",
  left: "0",
  width: "100%",
  height: "4rem",
  display: "flex",
  justifyContent: "center",
  borderBottom: "1px solid #e2e2e2",
  backgroundColor: "#ffffff",
  zIndex: "999",
});
