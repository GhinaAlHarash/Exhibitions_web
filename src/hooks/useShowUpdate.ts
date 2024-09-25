import { Exh } from "./useFetchExh";
import useFetchOne from "./useFetchOne";

const useShowUpdate = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  const res = useFetchOne<Exh | null>(`/api/showUpdateExhibition/${id}`, true);
  return res;
};

export default useShowUpdate;
