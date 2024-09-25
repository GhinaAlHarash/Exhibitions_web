import React from "react";
import useFetchOne from "./useFetchOne";
import { company } from "./useFetchAllComp";

const useCompanyStand = (id: string | undefined) => {
  return useFetchOne<company>(`/api/showCompanyStand/${id}`, true);
};

export default useCompanyStand;
