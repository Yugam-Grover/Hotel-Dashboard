import { useQuery } from "@tanstack/react-query";
import { GetCabins } from "../../services/cabins";

const useCabins = () => {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: GetCabins,
  });

  if (error)
    throw new Error("Cabins data could not be fetched through React-Query.");

  return { cabins, isLoading };
};

export default useCabins;
