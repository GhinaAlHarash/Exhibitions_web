import useDelete from "./useDelete";
import useFetchData from "./useFetchData";

const useDelSpons = (enable: boolean, id: number, fun:()=>{}) => {
  const res = useDelete<"">(`/api/deleteSponsor/${id}`, enable, fun);
  return res;
};
export default useDelSpons;
