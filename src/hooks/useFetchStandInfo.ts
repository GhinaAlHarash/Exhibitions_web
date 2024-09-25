import React from "react";
import useFetchData from "./useFetchData";

interface standinfo {
  stand_price: number;
  stand: standinfo;
  company: {
    id: number;
    company_name: string;
    img: string;
  };
}

const useFetchStandInfo = (id: string) => {
  return useFetchData<standinfo>(`/api/showStandInfo/${id}`, true);
};

export default useFetchStandInfo;
