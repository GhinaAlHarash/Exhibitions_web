import useSendData from "./useSendData";

const useAddSec = (fun: () => void) => {
  const res = useSendData<{ id: number; name: string }, { name: string }>(
    "/api/addSection",
    (Exhs: { id: number; name: string }) => {
      fun();
    }
  );
  return res;
};

export default useAddSec;
