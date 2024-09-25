import useFetchData from "./useFetchData";

const useRejcExh = (enable: boolean, id: number, fun: () => void) => {
  return useFetchData<"">(`/api/rejectExhibition/${id}`, enable, fun);
};
export default useRejcExh;
