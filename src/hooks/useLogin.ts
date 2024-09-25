import apiClient from "../services/apiClient";
import useSendData from "./useSendData";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  token: string;
  roles: string[];
}

export interface loginData {
  email: string;
  password: String;
}

const useLogin = () => {
  const res = useSendData<User, loginData>("/api/login");

  apiClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${res.data?.data.token}`;

  if (res.data?.status == 200) {
    localStorage.setItem("userId", res.data?.data.id.toString());
    localStorage.setItem("userToken", res.data?.data.token);

    if (res.data.data.id == 2) localStorage.setItem("useroles", "employeeUser");
    else localStorage.setItem("useroles", res.data?.data.roles[0]);
    localStorage.setItem("username", res.data?.data.name);
  }

  return res;
};

export default useLogin;
