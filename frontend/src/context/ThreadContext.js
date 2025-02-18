import { createContext, useReducer } from "react";

export const ThreadContext = createContext();

export const threadsReducer = (state, action) => {
  switch (action.type) {
    case "GET_THREADS":
      return {
        threads: action.payload,
      };

    case "UPDATE_THREAD_REPLIES":
      return {
        ...state,
        threads: state.threads.map((thread) =>
          thread._id === action.payload.threadId
            ? { ...thread, replies: action.payload.replies }
            : thread
        ),
      };
    default:
      return state;
  }
};

export const ThreadContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(threadsReducer, {
    threads: [],
  });

  return (
    <ThreadContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThreadContext.Provider>
  );
};
