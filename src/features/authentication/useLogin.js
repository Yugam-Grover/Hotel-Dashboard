import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import LoginAuth from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => LoginAuth({ email, password }),
    onSuccess: (user) => {
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("Entered email or password is incorrect!");
    },
  });
  return { login, isPending };
}
