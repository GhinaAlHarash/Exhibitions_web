import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { Exh } from "./useFetchExh";

export interface TRes<T> {
    status: number;
    data: T;
    message:string;
}

const useSendData = <T,X>(endPoint: string, fun:(Exhs: T)=>void=(Exhs: T)=>{}) => {
    return useMutation<TRes<T>,Error,X>({
        mutationFn: (data:X) =>
          apiClient.post<TRes<T>>(endPoint,data).then((res) =>  {fun(res.data.data); return res.data}),
      });
}
export default useSendData;