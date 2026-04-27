import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/ApiSettings";

const useSettings = () => {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  if (error) throw new Error("could not fetch settings ❌");

  return { isLoading, settings };
};

export default useSettings;
