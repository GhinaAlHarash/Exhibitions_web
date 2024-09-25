import React from "react";
import useFetchData from "./useFetchData";

export interface vistor {
  id: number;
  name: string;
  email: string;
  password: String;
  password_confirmation: string;
  phone: string;
  userable: {
    id: number;
    gender: string;
    birth_date: string;
  };
}
const useFetchAllVis = () => {
  return useFetchData<vistor>(`/api/showVisitors`, true);
};

export default useFetchAllVis;
