import React from "react";
import useFetchData from "./useFetchData";

const usedeleteExh = (enable: boolean, fun: () => void) => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  const res = useFetchData<"">(`/api/deleteExhibition/${id}`, enable, fun);
  return res;
};

export default usedeleteExh;
