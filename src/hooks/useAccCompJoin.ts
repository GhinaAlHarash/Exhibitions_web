import useFetchData from "./useFetchData";

export const useAccCompJoin = (enable: boolean, id: number,fun: () => void) => {
  return useFetchData<"">(`/api/accept_company/${id}`, enable, fun);
};
