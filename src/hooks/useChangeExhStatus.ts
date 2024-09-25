import React from "react";
import useSendData from "./useSendData";

const useChangeExhStatus = (id: number, fun: () => void) => {
  const res = useSendData<"", { status: number }>(
    `/api/changeExhibitionStatus/${id}`,
    (Exhs: "") => {
      fun();
    }
  );
  return res;
};

export default useChangeExhStatus;
