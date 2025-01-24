import { ReactNode } from "react";
import { main_layout_style_object } from "./style";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={main_layout_style_object.main_style}>{children}</main>
  );
};
