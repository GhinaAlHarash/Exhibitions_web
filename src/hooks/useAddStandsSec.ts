import React from "react";
import useSendData from "./useSendData";

const useAddStandsSec = (fun: () => void) => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  const res = useSendData<"", { name: string }>(`/api/addCategory/${id}`, () =>
    fun()
  );
  return res;
};

export default useAddStandsSec;
