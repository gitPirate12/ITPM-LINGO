import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, userName) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3040/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userName }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Signup failed");
      }

      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return false;
    }
  };

  return { signup, isLoading, error };
};
