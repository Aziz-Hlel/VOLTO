import React from "react";
import { useScrollDirection } from "./useScrollDirection";

interface ScrollNavbarProps {
  children: React.ReactNode;
}

export const ScrollNavbar: React.FC<ScrollNavbarProps> = ({ children }) => {
  const isVisible = useScrollDirection();

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      {children}
    </div>
  );
};
