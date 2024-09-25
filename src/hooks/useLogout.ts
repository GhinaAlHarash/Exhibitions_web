import React from "react";
import useFetchData from "./useFetchData";

const useLogout = (enable: boolean) => {
  const res = useFetchData<"">("/api/logout", enable);
};

export default useLogout;
