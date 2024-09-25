import React from "react";
import useFetchData from "./useFetchData";

const useAccCompExh = (
  enable: boolean,
  id: number,
  fun: () => void = () => {}
) => {
  let Eid = Number(localStorage.getItem("CurrentExhId"));
  return useFetchData<"">(
    `/api/acceptCompanyExhibitionRequest/${id}/${Eid}`,
    enable,
    fun
  );
};

export default useAccCompExh;
