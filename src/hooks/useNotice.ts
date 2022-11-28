import { useEffect, useState } from "react";

const useNotice = (initArr: string[] = []) => {
  const [notice, setNotice] = useState<string[]>(initArr);

  const addNotice = (notice: string) => {
    setNotice((prev) => [notice, ...prev]);
  };

  useEffect(() => {
    if (notice.length === 0) return;

    const timeout = setTimeout(() => {
      setNotice((prev) => {
        prev.pop();
        return [...prev];
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [notice]);

  return { notice, addNotice };
};

export default useNotice;
