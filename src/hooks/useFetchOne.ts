import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

interface TResSingle<T> {
  status: number;
  data: T;
  message: string;
}

const useFetchOne = <T>(
  endPoint: string,
  enable: boolean,
  fun: (Exhs: T) => void = (Exhs: T) => {}
) => {
  let backStatus;
  let message;

  const fetchData = () =>
    apiClient.get<TResSingle<T>>(endPoint).then((res) => {
      backStatus = res.data.status;
      message = res.data.message?res.data.message:"0";
      console.log("hi  "+res.data.message)
      fun(res.data.data);
      return res.data.data;
    });

  const { data, error, isLoading, refetch } = useQuery<T, Error>({
    queryKey: [endPoint],
    queryFn: fetchData,
    staleTime: 10 * 1000,
    enabled: enable,
    onError: (err: Error) => console.log("hi: ", err),
  });

  return { backStatus, message, data, error, isLoading, refetch };
};

export default useFetchOne;
