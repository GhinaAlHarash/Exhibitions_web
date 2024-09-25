import React from "react";
import useDelete from "./useDelete";
import useFetchData from "./useFetchData";

const useDelExhGat = (enable: boolean, id: number, fun: () => {}) => {
  let Eid = Number(localStorage.getItem("CurrentExhId"));
  const res = useFetchData<"">(
    `/api/deleteExhibitionSection/${Eid}/${id}`,
    enable,
    fun
  );
  return res;
};

export default useDelExhGat;
