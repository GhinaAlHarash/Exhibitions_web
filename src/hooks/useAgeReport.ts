import React from "react";
import useFetchData from "./useFetchData";
import useFetchOne from "./useFetchOne";

const useAgeReport = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchOne<{
    "0-18": number;
    "19-25": number;
    "26-35": number;
    "36-45": number;
    "46-55": number;
    "56+": number;
  }>(`/api/AgeVisitor/${id}`, true);
};

export default useAgeReport;
