import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UpdateCurrentUser } from "../../services/apiAuth";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateCurrentUser,
    onSuccess: () => {
      toast.success("Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => toast.error("An error occurred during the operation."),
  });
  return { updateUser, isUpdating };
}
