import { Exh } from "./useFetchExh";
import useRerender from "../stores/useRerender";
import useSendData from "./useSendData";
import { ExhOne } from "./useFetchOneExh";

const useUpdateExh = (fun: () => void = () => {}) => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  const { setExhs } = useRerender();
  const res = useSendData<ExhOne, Exh>(
    `/api/updateExhibition/${id}`,
    (Exh: ExhOne) => {
      setExhs(Exh);
      fun();
    }
  );
  return res;
};

export default useUpdateExh;
