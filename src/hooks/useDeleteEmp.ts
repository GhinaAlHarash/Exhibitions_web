import useFetchData from "./useFetchData";

const useDeleteEmp = (enable: boolean, id: number, fun: () => void) => {
  const res = useFetchData<"">(`/api/delete_employee/${id}`, enable, fun);
  return res;
};
export default useDeleteEmp;
