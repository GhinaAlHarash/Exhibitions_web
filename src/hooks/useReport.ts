import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

interface TRes {
  status: number;
  data: {
    "total ticket Revenue": number;
    totalStandPrice: string;
    organizerFees: number;
  };
  message: string;
}

const useReport = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));

  const fetchData = () =>
    apiClient.get<TRes>(`/api/financialStudyReport/${id}`).then((res) => {
      return res.data;
    });

  const { data, error, isLoading, refetch } = useQuery<TRes, Error>({
    queryKey: [`/api/financialStudyReport/${id}`],
    queryFn: fetchData,
    staleTime: 10 * 1000,
    onError: (err: Error) => console.log("hi: ", err),
  });

  return { data, error, isLoading, refetch };
};

export default useReport;
