import { addNotice, deleteNotice, initNotice } from "@/store/modules/notice";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from ".";

const useNotice = () => {
  const notice = useAppSelector(({ notice: { notice } }) => notice);
  const dispatch = useAppDispatch();

  const addNoticeAndTimeoutPopWithDelay = useCallback(
    (notice: string, delay = 1000) => {
      dispatch(addNotice(notice));

      const timeout = setTimeout(() => {
        dispatch(deleteNotice());
      }, delay);

      return () => clearTimeout(timeout);
    },
    [dispatch]
  );

  const resetNotice = useCallback(() => {
    dispatch(initNotice());
  }, [dispatch]);

  return { notice, addNoticeAndTimeoutPopWithDelay, resetNotice };
};

export default useNotice;
