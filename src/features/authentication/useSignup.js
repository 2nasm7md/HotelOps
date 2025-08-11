import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("New Account created successfully!");
    },
    onError: (error) => {
      toast.error("Something wrong! Please Try again.");
      console.error(error.message);
    },
  });
  return { signup, isLoading };
}
