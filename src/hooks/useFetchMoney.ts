import React from "react";
import useFetchOne from "./useFetchOne";

const useFetchMoney = (id: string | null | undefined) => {
  return useFetchOne<{ user_id: number; amount: number }>(
    `/api/showUserMoney/${id}`,
    true
  );
};

export default useFetchMoney;
