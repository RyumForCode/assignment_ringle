import { ReactNode } from "react";
import style_object from "./style";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return <main className={style_object.main_style}>{children}</main>;
};
