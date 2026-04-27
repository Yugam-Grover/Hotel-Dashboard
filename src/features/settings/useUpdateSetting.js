import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSetting as updateSettingApi } from "../../services/ApiSettings";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting updated successfully.");
      queryClient.invalidateQueries("settings");
    },
    onError: (err) => toast.error("An error occurred during the operation."),
  });
  return { updateSetting, isUpdating };
}
