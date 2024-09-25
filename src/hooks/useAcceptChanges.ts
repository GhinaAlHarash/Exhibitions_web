import React from "react";
import useFetchData from "./useFetchData";

const useAcceptChanges = (enable: boolean, fun: () => void) => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchData<"">(`/api/acceptExhibitionUpdate/${id}`, enable, fun);
};

export default useAcceptChanges;
