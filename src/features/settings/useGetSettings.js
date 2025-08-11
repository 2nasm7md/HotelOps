import { useQuery } from "@tanstack/react-query";
import { getSettings as getSettingsApi } from "../../services/apiSettings";

export function useGetSettings() {
  const {
    data: settings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });

  return { settings, error, isLoading };
}
