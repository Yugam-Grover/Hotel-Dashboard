import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting updated successfully.");
      queryClient.invalidateQueries("settings");
    },
    onError: () => toast.error("An error occurred during the operation."),
  });
  return { updateSetting, isUpdating };
}
