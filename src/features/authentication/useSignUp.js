import { useMutation } from "@tanstack/react-query";
import { SignUp } from "../../services/apiAuth";
import { toast } from "react-toastify";

export default function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: SignUp,
    onSuccess: (user) => {
      toast.success(
        `Thanks for signing up! We've sent a confirmation email to ${user?.user_metadata?.email}`,
      );
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during sign up.");
    },
  });
  return { signup, isLoading };
}
