import React from "react";
import Drawer from "./drawer";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex">
      <Drawer />
      <main className=" mt-20 ml-40">{children}</main>
    </div>
  );
}
