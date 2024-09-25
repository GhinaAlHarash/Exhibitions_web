import React from "react";
import useSendData from "./useSendData";

const useAddPro = (fun: () => void) => {
  const res = useSendData<"", FormData>(`/api/addProduct`, (Exhs: "") => {
    fun();
  });
  return res;
};

export default useAddPro;
