import useSendData from "./useSendData";

const useSetNewPass = () => {
  let id = Number(localStorage.getItem("userId"));
  const res = useSendData<
    [],
    { password: string; password_confirmation: string }
  >(`/api/UserResetPassword/${id}`);
  return res;
};
export default useSetNewPass;
