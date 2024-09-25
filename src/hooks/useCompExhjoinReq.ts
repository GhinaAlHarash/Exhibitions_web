import React from "react";
import useFetchData from "./useFetchData";

const useCompExhjoinReq = (enable: boolean, fun: () => void) => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchData<"">(
    `/api/createCompanyExhibitionRequest/${id}`,
    enable,
    fun
  );
};

export default useCompExhjoinReq;
