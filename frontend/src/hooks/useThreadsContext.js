import { ThreadContext } from "../context/ThreadContext";
import { useContext } from "react";

export const useThreadsContext = () => {
  const context = useContext(ThreadContext);

  if (!context) {
    throw Error("useThreadsContext must be used within ThreadContextProvider");
  }

  return context;
}