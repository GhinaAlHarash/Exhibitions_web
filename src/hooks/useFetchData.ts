import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

interface TRes<T> {
  status: number;
  data: T[];
  message: string;
}

const useFetchData = <T>(
  endPoint: string,
  enable: boolean,
  fun: () => void = () => {}
) => {
  let backStatus;

  const fetchData = () =>
    apiClient.get<TRes<T>>(endPoint).then((res) => {
      backStatus = res.data.status;
      fun();
      return res.data.data;
    });

  const { data, error, isLoading, isFetching, refetch } = useQuery<T[], Error>({
    queryKey: [endPoint],
    queryFn: fetchData,
    staleTime: 10 * 1000,
    enabled: enable,
    onError: (err: Error) => console.log("hi: ", err),
    refetchOnWindowFocus: true,
  });
  return { backStatus, data, error, isLoading, isFetching, refetch };
};

export default useFetchData;
