import useSendData from "./useSendData";

const useStandBooking = (fun: () => void) => {
  const res = useSendData<
    "",
    { stands: { id: number; stand_price: number }[] }
  >(`/api/standBooking`, () => {
    fun();
  });
  return res;
};

export default useStandBooking;
