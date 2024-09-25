import { Text } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

const NavigateToLogin = () => {
  return <Navigate to="/login" />;
};

export default NavigateToLogin;
