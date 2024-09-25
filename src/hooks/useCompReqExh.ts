import React from "react";
import useFetchData from "./useFetchData";
import { profileCom } from "./useComProfile";

const useCompReqExh = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchData<profileCom>(
    `/api/showCompaniesExhibitionRequest/${id}`,
    true
  );
};

export default useCompReqExh;
