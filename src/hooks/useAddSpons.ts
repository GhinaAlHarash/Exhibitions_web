import React from "react";
import useSendData from "./useSendData";

const useAddSpons = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  const res = useSendData<"", FormData>(`/api/addSponsor/${id}`);
  return res;
};

export default useAddSpons;
