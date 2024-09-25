import { useNavigate } from "react-router-dom";
import useVisStore from "../stores/useVisStore";
import { vistor } from "./useFetchAllVis";
import useSendData from "./useSendData";

const useVisSearch = () => {
  const navigate = useNavigate();
  const { setvistors } = useVisStore();
  const res = useSendData<vistor[], { name: string }>(
    "/api/searchVisitor",
    (visitors: vistor[]) => {
      setvistors(visitors);
      navigate("/dash/VisSearch");
      localStorage.setItem("CurrentPage", "visSearch");
    }
  );
  return res;
};

export default useVisSearch;
