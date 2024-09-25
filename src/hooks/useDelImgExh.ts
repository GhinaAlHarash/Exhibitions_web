import React from "react";
import useDelete from "./useDelete";

const useDelImgExh = (id: number, enable: boolean) => {
  const res = useDelete<"">(`/api/deleteExhibitionMedia/${id}`, enable);
  return res;
};

export default useDelImgExh;
