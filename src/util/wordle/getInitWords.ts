import { Words } from "@/types";

const getInitWords = (): Words =>
  Array(6)
    .fill("")
    .map((_) =>
      Array(5)
        .fill("")
        .map((_) => ({
          char: "",
          state: "INIT",
        }))
    );

export { getInitWords };
