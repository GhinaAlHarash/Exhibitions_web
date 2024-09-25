import { User } from "./useLogin";
import { registerData } from "./useRegister";
import useSendData from "./useSendData";

const useAddemp = (fun: () => void) => {
  const res = useSendData<User, registerData>(
    "/api/add_employee",
    (Exhs: User) => {
      fun();
    }
  );
  return res;
};

export default useAddemp;
