import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../APIs/albumAPI";

const useGetNewReleases = () => {
  return useQuery({ 
    queryKey: ["new-releases"], 
    queryFn: () => {
        return getNewReleases();
    }
});
};
