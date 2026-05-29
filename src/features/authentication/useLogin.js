import { useMutation } from "@tanstack/react-query";
import LoginAuth from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => LoginAuth({ email, password }),
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Entered email or password is incorrect!");
    },
  });
  return { login, isPending };
}
