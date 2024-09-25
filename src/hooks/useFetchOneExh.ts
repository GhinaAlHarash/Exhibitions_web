import useMaininfoStore from "../stores/useRerender";
import useFetchOne from "./useFetchOne";
export interface ExhOne {
  id: number;
  title: string;
  cover_img: string | null;
  body: string;
  start_date: string;
  end_date: string;
  time: string;
  price: number;
  location: string;
  exhibition_map: string;
  number_of_stands: number | null;
  sections: { id: number; name: string }[] | null;
  media: { id: number; url: string }[];
  status: number;
  exhibition_sponser: { id: number; name: string; img: string }[];
}
const useFetchOneExh = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  const { setExhs } = useMaininfoStore();
  return useFetchOne<ExhOne>(
    `/api/showExhibition/${id}`,
    true,
    (Exh: ExhOne) => {
      setExhs(Exh);
    }
  );
};
export default useFetchOneExh;
