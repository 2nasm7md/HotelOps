import { useQuery } from "@tanstack/react-query";
import { getCabins as getCabinsApi } from "../../services/apiCabins";

export function useGetCabins() {
  const {
    data: cabindata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabinsApi,
  });

  return { cabindata, isLoading, error };
}
