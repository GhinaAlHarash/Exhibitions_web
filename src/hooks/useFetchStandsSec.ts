import useFetchData from "./useFetchData";

const useFetchStandsSec = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchData<{ id: number; name: string }>(
    `/api/showExhibitionCategory/${id}`,
    true
  );
};

export default useFetchStandsSec;
