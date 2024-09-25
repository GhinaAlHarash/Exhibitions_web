import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

interface TRes {
  data: {
    id: string;
    notifiable_id: number;
    data: string[];
  }[];
}

const useNotification = () => {
  const fetchData = () =>
    apiClient.get<TRes>("/api/showUnreadNotifications").then((res) => {
      return res.data;
    });

  const { data, error, isLoading, isFetching, refetch } = useQuery<TRes, Error>(
    {
      queryKey: ["/api/showUnreadNotifications"],
      queryFn: fetchData,
      staleTime: 10 * 1000,
      refetchOnWindowFocus: true,
    }
  );
  return { data, error, isLoading, isFetching, refetch };
};

export default useNotification;
