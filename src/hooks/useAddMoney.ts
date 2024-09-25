import React from "react";
import useSendData from "./useSendData";

const useAddMoney = (id: string | null, fun: () => void) => {
  const res = useSendData<"", { amount: number }>(
    `/api/addMoney/${id}`,
    (Exhs: "") => {
      fun();
    }
  );
  return res;
};

export default useAddMoney;
