import useFetchData from "./useFetchData";

const useSections = () => {
  const res = useFetchData<"">(`/api/refresh_code`, true);
  return res;
};
export default useSections;
