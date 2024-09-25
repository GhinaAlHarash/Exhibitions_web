import useSendData from "./useSendData";

const useAddStand = (fun: () => void) => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  const res = useSendData<"", { name: string; size: string; price: number }>(
    `/api/addStand/${id}`,
    () => fun()
  );
  return res;
};

export default useAddStand;
