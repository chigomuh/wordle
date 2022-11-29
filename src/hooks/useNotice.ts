import { useState } from "react";

interface Option {
  isPopup?: boolean;
  duration?: number;
}

const useNotice = (initArr: string[] = []) => {
  const [notice, setNotice] = useState<string[]>(initArr);

  const addNotice = (notice: string, option?: Option) => {
    const { isPopup = true, duration = 1000 } = option ?? {};

    setNotice((prev) => [notice, ...prev]);

    if (!isPopup) return;

    setTimeout(() => {
      setNotice((prev) => {
        prev.pop();
        return [...prev];
      });
    }, duration);
  };

  return { notice, setNotice, addNotice };
};

export default useNotice;
