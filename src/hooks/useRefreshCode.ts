
import useFetchData from "./useFetchData";

const useRefreshCode = (enable:boolean) => {

    let id=Number(localStorage.getItem("userId"));
  const res = useFetchData<"">(`/api/refresh_code/${id}`,enable);
  return res;
};
export default useRefreshCode;
