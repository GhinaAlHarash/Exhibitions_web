import React from "react";
import useFetchOne from "./useFetchOne";

interface Report {
  companiesCount: number;
  standsCount: number;
  visitorsCount: number;
  stands: {
    id: number;
    name: string;
    size: string;
    price: number;
    status: number;
    exhibition_id: number;
    company_num: number;
  }[];
}

const useFetchReports = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchOne<{ img: string }>(`/api/getExhibitionReport/${id}`, true);
};

export default useFetchReports;
