import { Dispatch, SetStateAction } from "react";

interface IDebounce {
  setCopy: Dispatch<SetStateAction<{ throttle: boolean; type: string }>>;
  isCopy: { throttle: boolean; type: string | null };
  type: string | undefined;
  timer?: number | undefined;
}

export function throttling({ setCopy, isCopy, type, timer = 2000 }: IDebounce) {
  if (isCopy.throttle) return;
  if (!isCopy.throttle) {
    setCopy({ throttle: true, type: type! });
    setTimeout(() => {
      setCopy({ throttle: false, type: "" });
    }, timer);
  }
}
