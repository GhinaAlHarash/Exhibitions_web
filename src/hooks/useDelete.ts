import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

interface TRes<T> {
  status: number;
  data: T[];
  message: string;
}

const useDelete = <T>(
  endPoint: string,
  enable: boolean,
  fun: () => void = () => {}
) => {
  let backStatus;
  const fetchData = () =>
    apiClient.delete<TRes<T>>(endPoint).then((res) => {
      backStatus = res.data.status;
      fun();
      return res.data.data;
    });

  const { data, error, isLoading, isFetching } = useQuery<T[], Error>({
    queryKey: [endPoint],
    queryFn: fetchData,
    staleTime: 10 * 1000,
    enabled: enable,
    onError: (err: Error) => console.log("hi: ", err),
  });

  return { backStatus, data, error, isLoading, isFetching };
};
export default useDelete;
