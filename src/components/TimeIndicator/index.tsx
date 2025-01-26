import { useEffect, useState } from "react";
import style_object from "./style";

export const TimeIndicator = () => {
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const calculation = () => {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ).getTime();
      const elapsedTime = now.getTime() - startOfDay;
      return elapsedTime / msPerDay;
    };

    setPercentage(calculation());

    const interval = setInterval(() => {
      setPercentage(calculation());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={style_object.time_indicator_wrapper_style}
      style={{ top: `calc(100%*${percentage})` }}
      id="time-indicator"
    >
      <div className={style_object.time_indicator_pointer_style} />
      <div className={style_object.time_indicator_niddle_style} />
    </div>
  );
};
