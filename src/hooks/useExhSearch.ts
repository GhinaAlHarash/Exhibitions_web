import { useNavigate } from "react-router-dom";
import useExhStore from "../stores/useExhStore";
import { Exh } from "./useFetchExh";
import useSendData from "./useSendData";

const useExhSearch = () => {
  const navigate = useNavigate();
  const { setExhs } = useExhStore();
  const res = useSendData<Exh[], { title: string }>(
    "/api/searchExhibition",
    (Exhs: Exh[]) => {
      setExhs(Exhs);
      navigate("/dash/ExhSearch");
    }
  );
  return res;
};

export default useExhSearch;
