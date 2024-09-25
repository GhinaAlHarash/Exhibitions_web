import useFetchData from "./useFetchData";
import { Exh } from "./useFetchExh";

const useExhRequests = () => {
  return useFetchData<Exh>(`/api/showExhibitionRequest`,true, );
};
export default useExhRequests;