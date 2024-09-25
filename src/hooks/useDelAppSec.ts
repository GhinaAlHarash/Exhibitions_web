import useDelete from "./useDelete";
import useFetchData from "./useFetchData";

const useDelAppSec = (enable: boolean, id: number, fun: () => void) => {
  const res = useDelete<{ name: string; id: number }>(
    `/api/deleteSection/${id}`,
    enable,
    fun
  );
  return res;
};
export default useDelAppSec;
