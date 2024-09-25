import React from "react";
import { profileCom } from "./useComProfile";
import useFetchData from "./useFetchData";

export interface company {
  id: number;
  company_name: string;
  business_email: string;
  website: string;
  office_address: string;
  summary: string;
  commercial_register: string;
  body: string;
  status: string;
  number_of_employees: null;
  img: string;
  user: {
    id: number;
    name: string;
    email: string;
    password_confirmation: string;
    phone: string;
  }[];
}
const useFetchAllComp = () => {
  return useFetchData<profileCom>(`/api/showCompanies`, true);
};

export default useFetchAllComp;
