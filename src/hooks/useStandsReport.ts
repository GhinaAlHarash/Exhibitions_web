import React from "react";
import useFetchData from "./useFetchData";

const useStandsReport = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchData<{
    stand_name: string;
    bid_price: number;
  }>(`/api/standMoneyReport/${id}`, true);
};

export default useStandsReport;
