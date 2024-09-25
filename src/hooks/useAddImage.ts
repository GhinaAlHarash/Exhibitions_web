import React from "react";
import useSendData from "./useSendData";

const useAddImage = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  const res = useSendData<"", { img: string }>(`/api/addExhibitionMedia/${id}`);
  return res;
};

export default useAddImage;
