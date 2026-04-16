import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEditCabin, DeleteCabin } from "../../services/cabins";
import { toast } from "react-toastify";

export default function useCabinOperations(operation) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      switch (operation) {
        case "edit":
          return CreateEditCabin(data.newCabinData, data.id);
        case "delete":
          return DeleteCabin(data);
        case "create":
        default:
          return CreateEditCabin(data);
      }
    },
    onSuccess: () => {
      toast.success(
        operation === "edit"
          ? "Cabin edited successfully."
          : operation === "delete"
            ? "Cabin deleted successfully"
            : "New Cabin created successfully.",
      );
      queryClient.invalidateQueries("cabins");
    },
    onError: (err) => toast.error("An error occurred during the operation."),
  });
  return { mutate, isPending };
}
