import React from "react";
import useFetchOne from "./useFetchOne";

const useRandonReports = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchOne<{
    companiesCount: number;
    standsCount: number;
    visitorsCount: number;
  }>(`/api/getExhibitionReport/${id}`, true);
};

export default useRandonReports;
