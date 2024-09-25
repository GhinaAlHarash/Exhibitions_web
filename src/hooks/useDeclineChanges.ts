import React from "react";
import useFetchData from "./useFetchData";

const useDeclineChanges = (enable: boolean, fun: () => void) => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchData<"">(`/api/rejectExhibitionUpdate/${id}`, enable, fun);
};

export default useDeclineChanges;
