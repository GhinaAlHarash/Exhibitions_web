import useFetchData from "./useFetchData";

export interface stands {
  id: number;
  name: string;
  size: string;
  price: number;
  status: number;
}

const useFetchStandsd = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchData<stands>(
    `/api/showExhibitionStands/${id}`,
    true
  );
};

export default useFetchStandsd;
