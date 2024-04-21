import { createContext, useContext as useReactContext } from "react";

export const context = createContext<{
  breakpoint: Breakpoint;
}>({
  breakpoint: "mobile",
});

export const useContext = () => useReactContext(context);
