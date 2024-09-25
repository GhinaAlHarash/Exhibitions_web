import React from "react";
import useFetchData from "./useFetchData";

const useDelVis = (enable: boolean, id: number, fun: () => void) => {
  const res = useFetchData<"">(`/api/removeVisitor/${id}`, enable, fun);
  return res;
};

export default useDelVis;
