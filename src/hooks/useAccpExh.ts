import useFetchData from "./useFetchData";

const useAccExh = (enable: boolean, id: number, fun: () => void) => {
  return useFetchData<"">(`/api/acceptExhibition/${id}`, enable, fun);
};
export default useAccExh;
