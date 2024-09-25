import { Exh } from "./useFetchExh";
import useSendData from "./useSendData";

const useAddExh = () => {
    const res = useSendData<Exh, Exh>("/api/addExhibition");
    return res;
}

export default useAddExh;