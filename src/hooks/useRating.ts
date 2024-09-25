import React from "react";
import useFetchOne from "./useFetchOne";

const useRating = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchOne<{
    percentage_rating: number;
  }>(`/api/getExhibitionAverageRating/${id}`, true);
};

export default useRating;
