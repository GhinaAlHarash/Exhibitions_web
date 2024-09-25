import React from "react";
import useFetchData from "./useFetchData";

interface Sponsers {
  id: number;
  name: string;
  img: string;
}

const useFetchSponsers = () => {
  
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchData<Sponsers>(`/api/showExhibitionSponsors/${id}`, true);
};

export default useFetchSponsers;
